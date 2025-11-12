import { useEffect, useState } from "react"

import { Button } from "@/components/Button"
import { Filter } from "@/components/Filter"
import { Input } from "@/components/Input"
import { Item } from "@/components/Item"
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage"
import { FilterStatus } from "@/types/FilterStatus"
import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"


export default function App(){
    const [filter, setFilter] = useState(FilterStatus.PENDING) //use state de filtro e description
    const [description, setDescription] = useState("") 
    const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE] //array de estados, ou pendente ou feito
    const [items,setItems] = useState<ItemStorage[]>([]) //useState de cada item, do tipo de ItemStorage[]
    
    async function handleAdd(){ //função assincrona para adicionar na lista
        if(!description.trim()){ //trim é para retirar os espaços da string
            return Alert.alert("Adicionar", "Informe a descrição para adicionar") //Alerta caso não tenha nada no aplicativo
        }
        

        const newItem = { //variável para o item
            id: Math.random().toString(36).substring(2),
            description,
            status: FilterStatus.PENDING,

        }
        
        await itemsStorage.add(newItem) //adiciona novo item a partir da função item de itemsStorage

        Alert.alert("Adicionado",`Adicionado ${description}`)
        setDescription("")
        setFilter(FilterStatus.PENDING)
    }

    async function itemsByStatus(){
        try{   
            const response = await itemsStorage.getByStatus(filter) //recebe a lista pelo método get e utilizar filter como parâmetroo
            setItems(response) 
        } catch(error){
            Alert.alert("Erro", "Não foi possível filtrar os itens")
        }
    }
    
    async function handleRemove(id: string){
        try{
            await itemsStorage.remove(id)
            await itemsByStatus()
        } catch(error){
            console.log(error)
            Alert.alert("Remover", "Não foi possível remover o item")
        }


    }
    useEffect(() => {
        itemsByStatus()
    }, [filter])
    return(
        <View style={styles.container}>             
            <Image source={require("@/assets/logo.png")} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder="O que você precisa comprar? "
                onChangeText={setDescription}
                value={description}
                />
                <Button title ="Adicionar" onPress={handleAdd}/>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    {FILTER_STATUS.map((status) =>( //Função que percorre a lista de estado de filtro (Inicia em PENDING, depois DONE) 
                        <Filter
                         key={status} 
                         status={status} 
                         isActive={status === filter}
                         onPress={() => setFilter(status)}
                        /> 
                    ))}


                    <TouchableOpacity style={styles.clearButton}>
                        <Text style={styles.clearText}>Limpar</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Item 
                        data={item}
                        onStatus={() => console.log("Mudar o Status")} 
                        onRemove={() => handleRemove(item.id)}></Item>

                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<Text style={styles.empty}>Nenhum item registrado</Text>}

                
                />

            </View> 
        </View>


    )
}

