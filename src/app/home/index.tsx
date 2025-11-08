import { Button } from "@/components/Button"
import { Input } from "@/components/Input"
import { Image, View } from "react-native"

import { Filter } from "@/components/Filter"
import { FilterStatus } from "@/types/FilterStatus"
import { styles } from "./styles"

export default function App(){
    return(
        <View style={styles.container}>
            
            <Image source={require("@/assets/logo.png")} style={styles.logo} />

            <View style={styles.form}>
                <Input placeholder="O que você precisa comprar? "/>
                <Button title ="Entrar"/>
                <Button title ="teste"/>
            </View>

            <View style={styles.content}>
                <Filter status={FilterStatus.DONE} isActive /> 
                <Filter status={FilterStatus.PENDING} isActive={false}/>
            </View> 
        </View>


    )
}

