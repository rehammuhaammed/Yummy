//Side Bar
let leftsideWidth = $(".leftside").innerWidth();
let isclose = true;
let data;
let mealId ;
let mealName;
let categoriesData;
let categoriesDetailsData;
let areaData;
let areaName;
let areaDetailsData
let IngredientData
let ingredientName
let ingredientDetailsData
//  ------------------------------------- loading screen------------------------------------------
function showAppLoader() {
    $('.loading').fadeIn(0, function () {
        setTimeout(() => {
            $('.loading').fadeOut(300, function () {
                $('body').css({ overflow: 'auto' });
                 
            });
        }, 300);
    });
}
showAppLoader();
//  ------------------------------------- Always back to home-------------------------------------------

$(".yummy").on("click", function() {
  showAppLoader();
   hide()
   $("#Home").css({ display: "block" });
   closeSidebar()
});

//  -------------------------------------fetch data-------------------------------------------

getData();
async function getData() {
  let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  data = await x.json();

  $("#Home .rowData").html( display());
}


//  -------------------------------------Start Side bar-------------------------------------------
function openSideBar() {
   $(".sidebar").animate({ left: `0px` }, 500)
   for (let i = 0; i < 5; i++) {
       $('.leftside .linkes li ').eq(i).animate({top:'0px'},(i+5)*100)
     }
    $(".baricon").removeClass("fa-align-justify").addClass("fa-x");
     isclose = false;
}
 function closeSidebar() {
   $(".sidebar").animate({ left: `-${leftsideWidth}px` }, 500,function () {
    $('.leftside .linkes li ').animate({top:'300px'})
   });
   
    $(".baricon").addClass("fa-align-justify");
    $(".baricon").removeClass("fa-x");

     isclose = true;
 }
function hide() {
  $("#Home").css({ display: "none" });
  $(".details").css({ display: "none" });
  $(".searchsec").css({ display: "none" });
  $('.categories').css({ display: "none" });
  $('.categoriesDetails').css({ display: "none" });
  $('.area').css({ display: "none" });
  $('.areaDetails').css({ display: "none" });
  $('.ingredient').css({ display: "none" });
  $('.IngredientDetails').css({ display: "none" });
  $('.contactUs').css({ display: "none" });

}
function clear() {
  $("#searchName").val('');
  $("#searchLetter").val('');
   $(".searchRowData").children().not(".loading").remove();
}

$(".sidebar").css({ left: `-${leftsideWidth}px` });
$(".bar").on("click", function () {
  if (isclose) {
    openSideBar() 
  } else {
   closeSidebar()
  }
});
 
// -------------------------------------end Side bar-------------------------------------------



//  ------------------------------------- display -------------------------------------------

function display() {
  let cartona = "";
  for (let i = 0; i < data.meals.length; i++) {
    cartona += `
      <div class="col">
        <div class="inner" data-id="${data.meals[i].idMeal}">      
          <img src=${data.meals[i].strMealThumb} class="w-100" alt="" />
          <div class="layer">
            <h3 class="strMeal">${data.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;
  }
  return cartona;
}
 
//  -------------------------------------display data in search-------------------------------------------

$("#Search").on("click", function () {
  //hide all div 
  hide()
  $(".searchsec").css({ display: "block" });

  //clear search
  clear()

  // close navbar
  closeSidebar()
});

//display data in search
 async function searchByname() {
  $(".searchsec .loading").fadeIn(300);
  

   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#searchName').val()}`);
   data = await x.json();
   if(data.meals!=null){
    $(".searchRowData").html( display());
   }else{
    $(".searchRowData").html('');
   }

  $(".searchsec .loading").fadeOut(300);
}
 async function searchByletter() {
  $(".searchsec .loading").fadeIn(300);
  let letter = $('#searchLetter').val();
  let x;
  if (letter === "") {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`);
  } else {
    x = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  }

  data = await x.json();

  if (data.meals != null) {
    $(".searchRowData").html(display(data.meals)); 
  } else {
    $(".searchRowData").html('');
  }

  $(".searchsec .loading").fadeOut(300);
}
//  -----------------------------------------End search-------------------------------------------


//  ----------------------------------------display details-------------------------------------------

$(".searchRowData").on("click", ".inner", function() {
   mealId = $(this).data("id");   
   showDetails()
   hide()
   $(".details").css({ display: "block" });
});
$(".rowData").on("click", ".inner", function() {
   mealId = $(this).data("id");   
  showDetails()
   hide()
   $(".details").css({ display: "block" });
});
$(".categoriesDetailsRow").on("click", ".inner", function() {
   mealId = $(this).data("id");   
  showDetails()
   hide()
   $(".details").css({ display: "block" });
});
$(".areaDetailsRow").on("click", ".inner", function() {
   mealId = $(this).data("id");   
  showDetails()
   hide()
   $(".details").css({ display: "block" });
});
$(".IngredientDetailsRow").on("click", ".inner", function() {
   mealId = $(this).data("id");   
  showDetails()
   hide()
   $(".details").css({ display: "block" });
});

//  -------------------------------------fill data details-------------------------------------------

 async function showDetails() {
  $(".details .loading").fadeIn(300);
   let cartona=''
   let cartona2=''
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
   data = await x.json();
   $(".details .loading").fadeOut(300);
   const meal = data.meals[0];
   $('.image img').attr('src',meal.strMealThumb)
   $('.image h2').html(meal.strMeal)
   $('.data p').html(meal.strInstructions)
   $('.data h3 .area').html(meal.strArea)
   $('.data h3 .CategoryName').html(meal.strCategory)
   for (let i = 1; i <= 20; i++) {
      const measure = meal[`strMeasure${i}`];
      const ingredient = meal[`strIngredient${i}`];
      if (measure && measure.trim() !== "" && ingredient && ingredient.trim() !== "") {
        cartona+=`
         <li class="alert alert-info m-2 p-1">${measure.trim()} ${ingredient.trim()}</li>
        `
      }
    }
   $('.data .recipes').html(cartona) 
   let tags=meal.strTags ? meal.strTags.split(','):[]
   for (let i = 0; i < tags.length; i++) {
    cartona2+=`
    <li class="alert alert-danger m-2 p-1">${tags[i]}</li>
    `
   }
   $('.data .tags').html(cartona2) 
   $('.data .source').attr('href',meal.strSource)
   $('.data .youtube').attr('href',meal.strYoutube)



}

//  -------------------------------------show categories-------------------------------------------

$("#Categories").on("click", function () {
 hide()
 $('.categories').css({ display: "block" });
 showCategories()
 closeSidebar()

});

//get data 
async function showCategories() {
  $(".categories .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
   categoriesData = await x.json();
   $(".categories .loading").fadeOut(300);
   displayCategories()
}

//display categories data 
function displayCategories() {
  let cartona = "";
  
  for (let i = 0; i < categoriesData.categories.length ; i++) {
    let description = categoriesData.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ");
    cartona += `
      <div class="col">
             <div class="inner" data-id="${categoriesData.categories[i].strCategory}">
              <img src=${categoriesData.categories[i].strCategoryThumb} class="w-100" alt="" />
              <div class="meal-layer text-center p-2">
                <h3>${categoriesData.categories[i].strCategory}</h3>
                <p>${description}</p>
              </div>
            </div>
         </div>
    `;
  }
 $('.categoriesRowData').html(cartona)
}

//  --------------------------------------  Filter By categories------------------------------------------
async function categoriesDetails() {
  $(".categoriesDetails .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`);
   categoriesDetailsData = await x.json();
   $(".categoriesDetails .loading").fadeOut(300);
  displayCategoriesDetails()
  
}
//  -------------------------------------display categoriesDetails-------------------------------------------

function displayCategoriesDetails() {
   let cartona = "";
  for (let i = 0; i < categoriesDetailsData.meals.length ; i++) {
     if (i === 20) break;
    cartona += `
       <div class="col">
        <div class="inner" data-id="${categoriesDetailsData.meals[i].idMeal}">        
          <img src=${categoriesDetailsData.meals[i].strMealThumb} class="w-100" alt="" />
          <div class="layer">
            <h3 class="strMeal">${ categoriesDetailsData.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;
  }  
 $('.categoriesDetailsRow').html(cartona)
}
//  ------------------------------------- show categoriesDetails -------------------------------------------

$(".categoriesRowData").on("click", ".inner", function() {
   mealName = $(this).data("id");  
   categoriesDetails()
   hide()
   $(".categoriesDetails").css({ display: "block" });
   
});

//  ------------------------------------- get Area data-------------------------------------------

async function getArea() {
  $(".area .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
   areaData = await x.json();   
   $(".area .loading").fadeOut(300);
   displayArea()
}

function displayArea() {
  let cartona = "";
  for (let i = 0; i < areaData.meals.length; i++) {
    cartona += `
        <div class="col">
          <div class="inner text-center " data-id="${areaData.meals[i].strArea}">
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${areaData.meals[i].strArea}</h3>
        </div>
        </div>
    `;
  }
  $('.areaRow').html(cartona)
}
//  ------------------------------------- show Areas -------------------------------------------

$("#Area").on("click", function () { 
  hide()
  getArea()
  $(".area").css({ display: "block" });
  closeSidebar()
});
//  ------------------------------------- show AreaDetails -------------------------------------------
$(".areaRow").on("click", ".inner", function() {
   areaName= $(this).data("id");
   hide()
   $('.areaDetails').css({ display: "block" });
   getAreaDetails()  
});
//  ------------------------------------- get AreaDetails-------------------------------------------
async function getAreaDetails() {
  $(".areaDetails .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`);
   areaDetailsData = await x.json();  
   $(".areaDetails .loading").fadeOut(300);
  displayAreaDetails()
  
}
//  ------------------------------------- display AreaDetails-------------------------------------------

function displayAreaDetails() {
   let cartona = "";
  for (let i = 0; i < areaDetailsData.meals.length ; i++) {
    if (i === 20) break;
    cartona += `
       <div class="col">
        <div class="inner" data-id="${areaDetailsData.meals[i].idMeal}" >        
          <img src=${areaDetailsData.meals[i].strMealThumb} class="w-100" alt="" />
          <div class="layer">
            <h3 class="strMeal">${ areaDetailsData.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;    
  }  
 $('.areaDetailsRow').html(cartona)
}

//  ------------------------------------- get ingredient data-------------------------------------------

async function getIngredient() {
  $(".ingredient .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
   IngredientData = await x.json();   
   $(".ingredient .loading").fadeOut(300);
   displayIngredient()
}

function displayIngredient() {
  let cartona = "";
  for (let i = 0; i < 20 ; i++) {
    let Description=IngredientData.meals[i].strDescription.split(" ").slice(0, 20).join(" ")
    cartona += `
       <div class="col">
          <div class="inner text-center  " data-id="${IngredientData.meals[i].strIngredient}">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${IngredientData.meals[i].strIngredient}</h3>
              <p>${Description}</p>
          </div>
        </div>
    `;
  }
  $('.ingredientRow').html(cartona)
}
//  ------------------------------------- show Ingredients -------------------------------------------

$("#Ingredients").on("click", function () { 
  hide()
  getIngredient()
  $(".ingredient").css({ display: "block" });
  closeSidebar()
});
//  ------------------------------------- show IngredientsDetails -------------------------------------------
$(".ingredientRow").on("click", ".inner", function() {
   ingredientName= $(this).data("id");
   hide()
   $('.IngredientDetails').css({ display: "block" });
   getIngredientDetails()  
});
//  ------------------------------------- get ingredientMealDetails-------------------------------------------
async function getIngredientDetails() {
   $(".IngredientDetails .loading").fadeIn(300);
   let x = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`);
   ingredientDetailsData = await x.json();
    $(".IngredientDetails .loading").fadeOut(300);
  displayIngredientDetails()
  
}
//  ------------------------------------- display ingredientMealDetails-------------------------------------------

function displayIngredientDetails() {
   let cartona = "";
  for (let i = 0; i < ingredientDetailsData.meals.length ; i++) {
    if (i === 20) break;
    cartona += `
       <div class="col">
        <div class="inner" data-id="${ingredientDetailsData.meals[i].idMeal}" >        
          <img src=${ingredientDetailsData.meals[i].strMealThumb} class="w-100" alt="" />
          <div class="layer">
            <h3 class="strMeal">${ ingredientDetailsData.meals[i].strMeal}</h3>
          </div>
        </div>
      </div>
    `;    
  }  
 $('.IngredientDetailsRow').html(cartona)
}

//  ------------------------------------- show contactUs -------------------------------------------

$("#ContactUs").on("click", function () { 
  hide()
  $(".contactUs").css({ display: "block" });
  closeSidebar()
});
//  ------------------------------------------- validete  -------------------------------------------

// دالة للتحقق من كل الحقول مرة واحدة
function checkAllInputs() {
  return validateName($('#Name').val()) &&
         validateEmail($('#Email').val()) &&
         validatePhone($('#Phone').val()) &&
         validateAge($('#Age').val()) &&
         validatePassword($('#Password').val()) &&
         validatePassword($('#Repassword').val());
}

function updateSubmitButton() {
  if (checkAllInputs()) {
    $('#submitBtn').removeClass('disabled').prop('disabled', false);
  } else {
    $('#submitBtn').addClass('disabled').prop('disabled', true);
  }
}


$('#Name').on('input', function() {
  if(validateName($(this).val())){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

// نفس الكلام يتكرر لكل الحقول
$('#Email').on('input', function() {
  if(validateEmail($(this).val())){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

$('#Phone').on('input', function() {
  if(validatePhone($(this).val())){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

$('#Age').on('input', function() {
  if(validateAge($(this).val())){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

$('#Password').on('input', function() {
  if(validatePassword($(this).val())){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

$('#Repassword').on('input', function() {
  if(validatePassword($(this).val()) && $('#Repassword').val() === $('#Password').val()){
    $(this).siblings(".alert").addClass("d-none").removeClass("d-block");
  } else {
    $(this).siblings(".alert").removeClass("d-none").addClass("d-block");
  }
  updateSubmitButton();
});

 function validateName(name) {
    return /^[a-zA-Z ]+$/.test(name.trim());
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^\d{10,15}$/.test(phone);
}

function validateAge(age) {
    return /^\d+$/.test(age) && age >= 10 && age <= 100;
}

function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}
