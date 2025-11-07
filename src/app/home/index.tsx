import { Button } from "@/components/Button"
import { Image, View } from "react-native"
import { styles } from "./styles"
export default function App(){
    return(
        <View style={styles.container}>
            <Image source={require("@/assets/logo.png")} style={styles.logo} />
            
            <Button
                title ="Entrar"
                activeOpacity= {0.5}
                onPress={() =>console.log("entrar")}
            />
            <Button 
                title ="Criar conta" 
                activeOpacity={0.9}
                onPress={() =>console.log("criar conta")}
            />
            <Button 
            title ="Salvar" 
            activeOpacity={0.9}
            onPress={() =>console.log("salvar")}
            />
            <Button 
            title ="Voltar" 
            activeOpacity={0.4} 
            onPress={() =>console.log("voltar")}
            />
            <Button 
            title ="Excluir" 
            activeOpacity={0.1}
            onPress={() =>console.log("excluir")}
            />
        </View>
    )
}

