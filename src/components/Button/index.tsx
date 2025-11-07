import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps &{ 
    title: string,
}

/*
export function Button ({activeOpacity, onPress, title}: Props){
    return (
        <TouchableOpacity style={styles.container} activeOpacity={activeOpacity} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}*/
export function Button ({title, ...rest}: Props){
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}