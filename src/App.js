import './App.css';
import {useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/todo';
import Modal from './components/modal';

function App() {

const [todos,setTodos] = useState([]);
const [todoText, setTodoText] = useState('') ; 
const [showModal,setShowModal] = useState(false);
const [editingTodo,setEditingTodo] = useState({});


  //! ekle butonuna tıklanınca yeni tod oluşturur
const handleSubmit = (e) => {
  e.preventDefault();

  if(!todoText){
    toast.warn('Formu doldurunuz!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return;
  }
 
  //!todo için gerekli bilgileri içeren obje oluşturma
const newTodo = {
  id: new Date().getTime(),
  title:todoText,
  date: new Date().toLocaleString(),
  isDone: false,
};
  //! oluşturulan todo objesini todolar state ine aktarma
  //ve önceki verileri muhafaza etme
setTodos([...todos, newTodo]);

//eleman eklenince formu sıfırlama
setTodoText('');
}
// silm ebutonuna basınc çalışır
//todoları gez ve id si silinecek todo nun id sine eşit olmayanları döndürür
const handleDelete = (deletedTodo) => {
 const filtred =  todos.filter((item) => item.id !== deletedTodo.id);
 setTodos(filtred);

toast.error('Todo kaldırıldı', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  });
}
// splice güncelleme metoduydu bunun için index gerekiyor
//yapıldı butonuna tıklandığında çalışır

  // 1 - düzenelenicek todonun dizideki sırasını bulma
  // 2 - düzenlenicek todonun isDone değerini terişne çevirme
  // 3 - todoyu diziden çıkarıp yerine düzenlenmiş halini koyma
  // 4 - todolar dizisinin bir kopyasını oluşturup onu güncelledik
  //  5 - güncelellenen kopyayı todoloların yerni değeri olarak tanımladık
  // ["elma" , "armut1", "karpuz"]



 const handleDone = (todo) => {
 const index = todos.findIndex((item)=> item.id === todo.id);

 const newValue = !todos[index].isDone;

 const changedTodo = {...todo,isDone: newValue};

 const newTodos = [...todos];

  newTodos.splice(index,1,changedTodo);
  setTodos(newTodos);
   //console.log(todos);
};
console.log(showModal);
//edisave butonuna tıklandığında yeni değerleri değişen objeyi diziye aktarma

 const handleSaveEdit = () => {
  if(!editingTodo.title) {
    toast.warn('Başlık değeri boş bırakılamaz!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      return;
  }


  let index = todos.findIndex((item) => item.id === editingTodo.id);

  const cloneTodos = [...todos];

  cloneTodos.splice(index, 1, editingTodo);

  setTodos(cloneTodos);

  setShowModal(false);

  toast.success('Todo başarıyla güncellendi', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });


 };
  return (
    <div>

    <h1 className="text-center p-3 ">CRUD</h1>
    <ToastContainer />
    <div className="container border p-4 mt-4 rounded"> 
  <form onSubmit={handleSubmit} className="d-flex gap-3">
  < input  
  className="form-control"
  type="text" 
  placeholder="yapılacakları giriniz..."
  value={todoText}
  onChange={(e) => {
    setTodoText(e.target.value);
  }} 
    />
  <button className="btn btn-warning btn-lg">Ekle</button>
</form>
<div className='d-flex flex-column gap-3 py-5'>
  {/*eğer state in içi boş ise ekrana basılacak yazı */}
  {
    todos.length === 0 && (<h4 className='text-center'>Yapılacak bir işiniz yok.</h4>)
  }
  {/*eğer state in içi dolu ise todoları ekrana basıyoruz */}
{
  todos.map((todo) => (
   <Todo 
    key ={todo.id}
    handleDelete ={handleDelete}
    todo ={todo}
    handleDone={handleDone}
    setShowModal={setShowModal}
    setEditingTodo={setEditingTodo}
   />
    ))}
        </div> 
      </div>
      {
        showModal && (
          <Modal
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          setShowModal={setShowModal}
          handleSaveEdit={handleSaveEdit}
          />
         )}
    </div>
  );
}

export default App;
