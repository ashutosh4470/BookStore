import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import BooksTable from '../components/home/BooksTable'
import BooksCard from '../components/home/BooksCard'


const Home = () => {
    const [books, SetBooks] = useState([]);
    const [loading, SetLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        SetLoading(true);
        axios
            .get('http://localhost:5001/books')
            .then((res) => {
                SetBooks(res.data.data);
                SetLoading(false);
            })
            .catch((err) => {
                console.log(err);
                SetLoading(false);
            })

    }, [])

    return (
        <div className='p-4'>
            <div className="flex justify-center items-center gap-x-4">
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}>
                    Table
                </button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}>
                    Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Book List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (<Spinner />) : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books}/>)}
        </div>
    )
}

export default Home