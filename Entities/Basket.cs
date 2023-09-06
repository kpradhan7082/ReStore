using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public List<BasketItem> BasketItems { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (BasketItems.All(m => m.ProductId != product.Id))
            {
                BasketItems.Add(new BasketItem
                {
                    ProductId = product.Id,
                });
            }

            var item = BasketItems.FirstOrDefault(m => m.ProductId == product.Id);
            if (item is not null)
            {
                item.Quantity += quantity;
            }


        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = BasketItems.FirstOrDefault(m => m.ProductId == productId);
            if (item is null)
                return;

            item.Quantity -= quantity;

            if (item.Quantity == 0)
            {
                BasketItems.Remove(item);
            }

        }
    }
}