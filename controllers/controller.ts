
var car:Car;
var wheelsBrands:string[]=[];
var wheelsDmt:number[]=[];
var cars:any[]=new Array;



function createCar(plate:string,brand:string,color:string){
    

    var plate=(<HTMLInputElement>document.getElementById("plate")).value.toUpperCase();
    var brand=(<HTMLSelectElement>document.getElementById("brand")).value.toUpperCase();
    var color=(<HTMLSelectElement>document.getElementById("carColor")).value.toUpperCase();

if (!validarPlate(plate)){
   errorInputs()
   }
   else{
    car=new Car(plate,color,brand);

    let plateDisplay:any = document.getElementById("carPlateInfo");
    plateDisplay.textContent = car.plate;
    let brandDisplay:any = document.getElementById("carBrandInfo")
    brandDisplay.textContent = car.brand;
    let colorDisplay:any = document.getElementById("carColorInfo")
    colorDisplay.textContent = car.color;
    noErrors()
    changeForm()
   }
}

function validarPlate(plate:any) {
    const regexPlate = /^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}/igm
        return regexPlate.test(plate) ? true : false;
     }
function errorInputs(){
    const error=<HTMLElement>document.getElementById("errorPlate");
    error.style.visibility="visible";
    var plateEl=<HTMLInputElement>document.getElementById("plate");
    plateEl.classList.add("validateInputError");
    
    }

    
function noErrors(){
    const error=<HTMLElement>document.getElementById("errorPlate");
    error.style.visibility="hidden";
    var plateEl= <HTMLInputElement>document.getElementById("plate");
    plateEl.classList.remove("validateInputError");
}
function changeForm(){
    const form=<HTMLFormElement>document.getElementById("form");
    const wheelsForm=<HTMLDivElement>document.getElementById("hidden");
    form.style.display="none"
     wheelsForm.classList.add("visible")
    
}
function success(){
    const lastDiv=<HTMLDivElement>document.getElementById("hidden2");
    const wheelsForm=<HTMLDivElement>document.getElementById("hidden");
    wheelsForm.style.display="none";
    lastDiv.style.display="block";
    
}
function saveCars(){
    cars.push(car)
    console.log(cars)
}


function addWheels(brand:string[], diameter:number[]) {
  var brands:string[] = new Array;
  var dmts:number[] = new Array;
  var dataCount:number = 0;

  for (let i = 0; i < 4; i++)
    {
        var wheelNumber=i+1;
        let wheelCustBrand=((<HTMLInputElement>document.getElementById("brandwheel"+wheelNumber)).value);
        brands.push(wheelCustBrand)
         dataCount++   
         
    
}
for (let i = 0; i < 4; i++){   
    var wheelNumber=i+1;
    let wheelcustDmt:number=parseFloat(((<HTMLInputElement>document.getElementById("dmtwheel"+wheelNumber)).value));
    dmts.push(wheelcustDmt);
    
   if (dmts[i]>=0.4 && dmts[i]<=2){
 
  dataCount++
}
    else{
        ((<HTMLInputElement>document.getElementById("dmtwheel"+(i+1))).value)=""
        const error=<HTMLElement>document.getElementById("errorDmt"+(i+1))
        error.style.visibility="visible";
        error.textContent=("El diámetro de la rueda "+(i+1)+" no es correcto")
        var dmtEl=<HTMLInputElement>document.getElementById("dmtwheel"+wheelNumber);
        dmtEl.classList.add("validateInputError");

    }
}

    if (dataCount===8)
    {
       
    success() 
    }
else{
    return false;

}


for (var i = 0; i < 4; i++){
car.addWheel((new Wheel(dmts[i],brands[i])))
console.log(car)
}

for (var i = 0; i < 4; i++) {
    const wheelNumber=i+1;
    var dmtDisplay:any = document.getElementById("wheelDmt"+wheelNumber);
    dmtDisplay.textContent=car.wheels[i]["diameter"];
  }
  for (var i = 0; i < 4; i++) {
    const wheelNumber=i+1;
    var brandDisplay:any = document.getElementById("wheelBrand"+wheelNumber);
    brandDisplay.textContent=car.wheels[i]["brand"];
  }
  return car
}

