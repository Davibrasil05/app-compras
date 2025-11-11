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
    const [filter, setFilter] = useState(FilterStatus.PENDING)
    const [description, setDescription] = useState("")
    const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
    const [items,setItems] = useState<ItemStorage[]>([])
    
    async function handleAdd(){
        if(!description.trim()){
            return Alert.alert("Adicionar", "Informe a descrição para adicionar")
        }
        

        const newItem = {
            id: Math.random().toString(36).substring(2),
            description,
            status: FilterStatus.PENDING,

        }
        
        await itemsStorage.add(newItem)
        await getItems()
    }
    async function getItems(){
        try{   
            const response = await itemsStorage.get()
            setItems(response)
        } catch(error){
            Alert.alert("Erro", "Não foi possível filtrar os itens")
        }
    }
    
    useEffect(() => {
        getItems()
    }, [])
    return(
        <View style={styles.container}>
            
            <Image source={require("@/assets/logo.png")} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder="O que você precisa comprar? " onChangeText={setDescription}/>
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
                        onRemove={() => console.log("Remover")}></Item>

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

