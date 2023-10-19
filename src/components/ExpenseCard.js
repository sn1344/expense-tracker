import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const ExpenseCard = ({expense, onDelete}) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
          .from('shopping')
          .delete()
          .eq('id', expense.id)
        
        if (error) {
          console.log(error)
        }
        if (data) {
          console.log(data)
          onDelete(expense.id)
        }
      }

    return ( 
        <div className="expense-card rounded-lg p-4 md:p-8 text-lg md:text-2xl bg-black text-white">
            <h3 className="text-red-500 font-bold text-xl md:text-3xl mb-4">{expense.name}</h3>
            <p className="mb-2">{expense.category}</p>
            <p className="mb-2">{expense.date}</p>         
            <div className="amount text-2xl md:text-4xl font-bold text-cyan-400">{expense.amount}</div>
            <div className="button">
            <Link to={"/" + expense.id}>
          <button className="bg-red-500 hover:bg-blue-700 text-white font-bold mt-5 px-4 rounded" type="button">Edit</button>
        </Link>
        <button onClick={handleDelete} className="ml-10 bg-blue-500 hover:bg-blue-700 text-white font-bold mt-5 px-4 rounded" type="button">Delete</button>
            </div>
        </div>
    )
}

export default ExpenseCard