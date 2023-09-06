using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Basket,BasketDto>();
            CreateMap<BasketItem, BasketItemDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src=>src.Product.Name))            
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src=>src.Product.Description))
                .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom(src=>src.Product.PictureUrl))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src=>src.Product.Brand))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src=>src.Product.Type));
            CreateMap<Basket,IEnumerable<BasketItemDto>>();
        }
    }
}