

//HELPER FUNCTION TO SORT JSBON OBJECTS BY A GIVEN KEY

const json_sort = (obj, sort_key) => {
    let temp_obj = [...obj]; 


    let sorted = Object.keys(temp_obj).sort().reduce(
        (obj, key) => { 
          obj[key] = temp_obj[key]; 
          return obj;
        }, 
        {}
      );

  return sorted; 
}

export default json_sort