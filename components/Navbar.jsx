
export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow">
        
      <div className='flex gap-2'>
            <img src='logo.png' alt='logo' width={60} height={60}/>
            <h2 className='font-bold text-2xl '>EduVerse</h2>
        </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Dashboard
      </button>
    </header>
  );
}

