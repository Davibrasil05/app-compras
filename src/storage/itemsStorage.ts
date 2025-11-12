import { FilterStatus } from "@/types/FilterStatus"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ITEMS_STORAGE_KEY = "@comprar:items" //chave

export type ItemStorage = { //tipo de cada item da lista
    id: string
    status: FilterStatus
    description: string

}

async function get(): Promise<ItemStorage[]> {
    try{
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY) //
        
        return storage ? JSON.parse(storage) : []
    } catch(error){
        throw new Error("ITEMS_GET" + error)
    }
    
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get()
    return items.filter((item) => item.status === status)
}

async function save(items: ItemStorage[]): Promise<void>{ //Função interna para salvar 
    try{
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    }catch(error){
        throw new Error("ITEMS_SAVE" + error)
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]>{ //função de adicionar na lista, parâmetro é o novo item, retorna a lista total
    const items = await get() //promise confirma que o retorno vai ser um ItemStorage[]
    const updatedItems = [...items, newItem] //variável que retorna toda  a lista e também o mais recente
    await save(updatedItems) //
    return updatedItems
}   
async function remove(id: string){
        const items = await get()
        const updatedItems = items.filter((item) => item.id !== id)
        await save(updatedItems)

    }
export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
}