import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const FullSneaker: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ramen, getRamen] = React.useState<{
        imageUrl: string
        name: string
        price: number
    }>()

    useEffect(() => {
        async function fetchSneaker() {
            try {
                const { data } = await axios.get(
                    `https://6421ee0c86992901b2bf51ae.mockapi.io/items/${id}`
                )
                getRamen(data)
            } catch (error) {
                alert('Error when receiving ramen!')
                navigate('/')
            }
        }

        fetchSneaker()
    }, [])

    if (!ramen) {
        return <>Loading...</>
    }

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={ramen.imageUrl} alt="" />
            <h2 className="pizza-block__title">{ramen.name}</h2>
            <p>{ramen.price}</p>
            <Link to="/">
                <button className="button button--outline button--add">
                    <span>Back</span>
                </button>
            </Link>
        </div>
    )
}

export default FullSneaker
