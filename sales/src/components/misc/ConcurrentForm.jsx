const ConcurrentForm = () => {
    return <>

        <div class="w-full max-w-xs" style={{margin: 'auto', marginTop: '15rem'}}>
            <form class="bg-white shadow-lg border-2 rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Concurrent Calls
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Concurrent Number" />
                </div>
              
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={()=>{
                        alert('Updated Concurrent Number in FreePbx')
                    }}>
                        Update
                    </button>
                
                </div>
            </form>
            
        </div>

    </>
}

export default ConcurrentForm