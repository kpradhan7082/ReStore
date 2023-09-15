import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/Basket"

interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItemFromBasket: (productId: number, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);
    if (context === undefined)
        throw Error("You do not have access to the context")

    return context;
}

export function StoreProvider({ children }: PropsWithChildren) {
    const [basket, setBasket] = useState<Basket | null>(null);

    function removeItemFromBasket(productId: number, quantity: number) {
        if (!basket)
            return;

        const items = [...basket.items];
        const itemIndex = basket.items.findIndex(m=>m.productId == productId);
        if(itemIndex >=0)
        {
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity === 0)
            {
                items.splice(itemIndex,1);
            }
            setBasket(prevState => {
                return {
                    ...prevState!,items
                }
            })
        }
    }

    return (
        <StoreContext.Provider value={{basket,setBasket,removeItemFromBasket}}>
            {children}
        </StoreContext.Provider>
    )

}
