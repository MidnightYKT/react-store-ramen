import React, { useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullSneaker: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [sneaker, setSneaker] = React.useState<{
        imageUrl: string
        name: string
        price: number
    }>()

    useEffect(() => {
        async function fetchSneaker() {
            try {
                const { data } = await axios.get(
                    'https://6421ee0c86992901b2bf51ae.mockapi.io/items/' + id
                )
                setSneaker(data)
            } catch (error) {
                alert('Ошибка при получении кроссовок!')
                navigate('/')
            }
        }

        fetchSneaker()
    }, [])

    if (!sneaker) {
        return <>Загрузка...</>
    }

    return (
        <div className="container">
            <img src={sneaker.imageUrl} />
            <h2>{sneaker.name}</h2>
            <p>{sneaker.price}</p>
        </div>
    )
}

export default FullSneaker
