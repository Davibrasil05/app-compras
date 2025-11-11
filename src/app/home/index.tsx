import { useState } from "react"

import { Button } from "@/components/Button"
import { Filter } from "@/components/Filter"
import { Input } from "@/components/Input"
import { Item } from "@/components/Item"
import { FilterStatus } from "@/types/FilterStatus"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
    {id: "1", status: FilterStatus.DONE, description: "1 pacote de café"},
    {id: "2", status: FilterStatus.PENDING, description: "2 caixas de leite"},
    {id: "3", status: FilterStatus.DONE, description: "3 sacos de arroz"},
]

export default function App(){
    const [filter, setFilter] = useState(FilterStatus.PENDING)
    const [description, setDescription] = useState("")
    return(
        <View style={styles.container}>
            
            <Image source={require("@/assets/logo.png")} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder="O que você precisa comprar? " onChangeText={setDescription}/>
                <Text>{description}</Text>
                <Button title ="Entrar"/>
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
                    data={ITEMS}
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

