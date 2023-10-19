import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !category || !date || !amount) {
      setFormError('Fill every field !!')
      return
    }

    const { data, error } = await supabase
      .from('shopping')
      .update({ name, category, date, amount })
      .eq('id', id)

    if (error) {
      setFormError('Fill correctly !!')
    }
    if (data) {
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchExpense = async () => {
      const { data, error } = await supabase
        .from('shopping')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setName(data.name)
        setCategory(data.category)
        setDate(data.date)
        setAmount(data.amount)
      }
    }

    fetchExpense()
  }, [id, navigate])

  return (
    <div className="updatePage bg-gray-100 min-h-screen pt-20 px-10 lg:px-auto">
       <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-cyan-300 rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-black font-bold mb-2">Name:</label>
          <input 
            type="text" 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-black font-bold mb-2">Category:</label>
          <textarea 
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-black font-bold mb-2">Date:</label>
          <input 
            type="date" 
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-black font-bold mb-2">Amount:</label>
          <input 
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Update Expense
        </button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update