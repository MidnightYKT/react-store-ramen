import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
                alert('Error when receiving sneakers!')
                navigate('/')
            }
        }

        fetchSneaker()
    }, [])

    if (!sneaker) {
        return <>Loading...</>
    }

    return (
        <div className="container">
            <img src={sneaker.imageUrl} />
            <h2>{sneaker.name}</h2>
            <p>{sneaker.price}</p>
            <Link to="notqweqwe">
                <button className="button button--outline button--add">
                    <span>Back</span>
                </button>
            </Link>
        </div>
    )
}

export default FullSneaker
