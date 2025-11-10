import { Button } from "@/components/Button"
import { Filter } from "@/components/Filter"
import { Input } from "@/components/Input"
import { Item } from "@/components/Item"
import { FilterStatus } from "@/types/FilterStatus"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function App(){
    return(
        <View style={styles.container}>
            
            <Image source={require("@/assets/logo.png")} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder="O que você precisa comprar? "/>
                <Button title ="Entrar"/>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    {FILTER_STATUS.map((status) =>( //Função que percorre a lista de estado de filtro (Inicia em PENDING, depois DONE) 
                        <Filter key={status} status={status} isActive /> 
                    ))}


                    <TouchableOpacity style={styles.clearButton}>
                        <Text style={styles.clearText}>Limpar</Text>
                    </TouchableOpacity>
                </View>

                <Item data={{status: FilterStatus.DONE, description: "café"}}
                 onStatus={() => console.log("Mudar o Status")} 
                 onRemove={() => console.log("Remover")}></Item>
            </View> 
        </View>


    )
}

