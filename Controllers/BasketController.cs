using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Mapping;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : ApiBaseController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public BasketController(StoreContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet(Name ="GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket basket = await RetriveBasketAsync();

            if (basket is null)
                return NotFound();
            return MapBasketToDto(basket);
        }

        

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // Get or create a basket
            var basket = await RetriveBasketAsync() ?? CreateBasket();
            if (basket is null)
                return BadRequest(new ProblemDetails
                {
                    Detail = "Issue with creating/retrieving the basket"
                });

            var product = await _context.Products.FindAsync(productId);
            if (product is null)
                return NotFound(new ProblemDetails
                {
                    Detail = "Product Not Found"
                });

            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtRoute("GetBasket",MapBasketToDto(basket));

            return BadRequest(new ProblemDetails
            {
                Detail = "Problem adding item to the basket"
            });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromBasket(int productId, int quantity)
        {
            var basket = await RetriveBasketAsync();
            if (basket is null)
                return NotFound();
            basket.RemoveItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return Ok();

            return BadRequest(new ProblemDetails
            {
                Detail = "Problem removing item to the basket"
            });

        }

        private Basket CreateBasket()
        {
            var userId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("UserId", userId, cookieOptions);
            var basket = new Basket
            {
                UserId = userId
            };
            _context.Baskets.Add(basket);
            return basket;
        }

        private async Task<Basket> RetriveBasketAsync()
        {
            return await _context.Baskets
                .Include(m => m.BasketItems)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(m => m.UserId == Request.Cookies["userId"]);
        }

        private BasketDto MapBasketToDto(Basket basket)
        {

            //return _mapper.Map<BasketDto>(basket);

            return new BasketDto
            {
                Id = basket.Id,
                Items = basket.BasketItems.Select(item => new BasketItemDto
                {
                    Id = item.Id,
                    Name = item.Product.Name,
                    Description = item.Product.Description,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    ProductId=item.ProductId,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}