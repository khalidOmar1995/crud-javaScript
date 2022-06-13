const myForm=document.querySelector('.myForm')
const inputName=document.querySelector('.name')
const inputEmail=document.querySelector('.email')
const inputNoblie=document.querySelector('.moblie')

const submit =document.getElementById('submit')
const contEdit =document.getElementById('contEdit')

const ourInputs=document.querySelectorAll('.myForm input[type=text]')
const myTable=document.querySelector('.myTable tbody')


class Employee{
    constructor(id ,name , email , moblie){
        this.id = id;
        this.name = name;
        this.email = email;
        this.moblie = moblie;
    }
    showDate(){
        Employee.ShowHTML(this.id ,this.name , this.email , this.mobile)
        return this 
    }
    showEmployee(){
        const allData =JSON.parse(localStorage.getItem('employee')) ?? [] 
        // هون عم قلو في حال وجد عندي بيانات في اللوكل ستوريج فكلي الجسوب عنها وفي حال لم توجد جبلي اريه عادية فاضية

        allData.push({id:this.id ,name:this.name ,email:this.email ,moblie:this.moblie });
        localStorage.setItem('employee' , JSON.stringify(allData))
    }

    static showAllEmployee(){
        if(localStorage.getItem('employee')){
            JSON.parse(localStorage.getItem('employee')).forEach((item)=>{
                Employee.ShowHTML(item.id , item.name , item.email , item.moblie)
            });
        }
    }
    static ShowHTML(id ,name , email , mobile){
        const trEl=document.createElement('tr')
        trEl.innerHTML =`
        <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${mobile}</td>
            <td>
                <button class="btn btn-info edit" data-id="${id}">edit</button>
                <button class="btn btn-danger delete" data-id="${id}">delete</button>
            </td>
        </tr>
        `
        myTable.appendChild(trEl)
    }
}

Employee.showAllEmployee();

let checkMyInput = true 
myForm.addEventListener('submit',function(e){
    e.preventDefault()

    for(let i=0 ; i<ourInputs.length ; i++){
        if(ourInputs[i].value == ''){
            checkMyInput = false
            break
        }else {
            checkMyInput = true
        }
    }
    console.log(checkMyInput)

    if(checkMyInput == true){
        let id = Math.floor(Math.random() * 1000000);
        // هون بدي اعمل يونيك اي دي  
    
        const newEmp= new Employee(id , inputName.value , inputEmail.value , inputNoblie.value);
        newEmp.showDate().showEmployee()
        // هون رجعلي الاوبجيكن الحالى الي انا شغال فيه حاليا ثم قمت باستدعاء الفانكشن الي اسمها شو داتا لاقول له خزنلي هذا الاوبجكت الي انا شغال عليه في اللوكل ستوريج 
    
        // وهي معروفة في البرمجة الكائنية باسم 
        // chaining
    
        inputName.value = ''
        inputEmail.value = ''
        inputNoblie.value = ''
    }
});
myTable.addEventListener('click',function(e){
    // هذا الفانكشن لحذف العنصر من اللوكل ستوريج
    if(e.target.classList.contains('delete')){
        let id = +e.target.getAttribute('data-id')
        let emps = JSON.parse(localStorage.getItem('employee'))
        let newData = emps.filter(item => item.id != id)

        localStorage.setItem('employee' , JSON.stringify(newData))

        // هون عملت فلترة لعناصر اللوكل ستوريج حتى وشلت منها الايدي الحالي حتى ارجع اعرضهم كاني حذفت العنصر من اللوكل ستورج 

        e.target.parentElement.parentElement.remove();
        // هنا كتبنا الميثود مرتين لكي تحذف جدها وليس ابوها فقط 
    }
    if(e.target.classList.contains('edit')){
        let id = +e.target.getAttribute('data-id')
        let item = JSON.parse(localStorage.getItem('employee')).find(item=> item.id ===id )
        console.log(item)
        inputName.value= item.name
         inputEmail.value= item.email
         inputNoblie.value= item.moblie
         contEdit.value= id
    }
});

