import supabase from "../config/supabaseClient"
import { useEffect, useState } from 'react'
import ExpenseCard from "../components/ExpenseCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [expenses, setExpenses] = useState(null)

  const handleDelete = (id) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('shopping')
        .select()
      
      if (error) {
        setFetchError('Cannot fetch expenses')
        setExpenses(null)
      }
      if (data) {
        setExpenses(data)
        setFetchError(null)
      }
    }

    fetchExpenses()

  }, [])

  return (
    <div className="flex justify-center">
    <div className="homePage flex justify-center">
      {fetchError && (<p>{fetchError}</p>)}
      {expenses && (
          <div className="expenses">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {
              expenses.map(expense => (
                  <ExpenseCard key= {expense.id} expense={expense}
                  onDelete={handleDelete}
                  />
              ))}
          </div>
          </div>
      )}
    </div>
    </div>
  )
}

export default Home