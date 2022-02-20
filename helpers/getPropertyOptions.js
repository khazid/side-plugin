import { Intl } from "intl";

export const calcBath = (full, half) => {

    let totalHalf = half / 2;

    return full + totalHalf
}

export const formatPrice = (amount) => {
    const formatPrice = `$${new Intl.NumberFormat().format(amount)}`

    return formatPrice

}

export const formatDate = (date) => {

    const newFormat = new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' })

    return newFormat

}
