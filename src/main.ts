const container = document.querySelector('#container') as HTMLElement;

const getHtmlData = (country: string, value: number) => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  span.className = `country__value ${country}`;
  span.textContent = ` ${value}%`;
  div.className = ` country__name ${country}`;
  div.textContent = `${country}`;

  div.appendChild(span);
  container?.appendChild(div);

  value > 0
    ? (span.style.color = 'springgreen')
    : (span.style.color = 'tomato');
};
const removeHtmlData = (country: string) => {
  const container = document.querySelector('#container') as HTMLElement;
  const div = container.querySelector(`.${country}`) as HTMLElement;
  console.log(div);
  if (div !== null) {
    div.remove();
  }
};

const updateHtmlData = (country:string, value: number) => {
  const container = document.querySelector('#container') as HTMLElement;
  const div = container.querySelector(`.${country}`) as HTMLElement;
  const span = div.querySelector(`.${country}`) as HTMLElement;
  console.log(div);
  if (div !== null) {
    // div.remove();
    span.textContent = ` ${value}%`;
  }
};
let arrData: any[] = [];

const fetchData = async () => {
  const response = await fetch('http://localhost:3000/pays/1');
  const jsData = await response.json();

  console.log('jsdata',jsData.length, JSON.stringify(jsData));
  console.log('data',arrData.length, JSON.stringify(arrData));

  if (arrData.length === 0) {
    jsData.forEach((e: any) => {
      // console.log(JSON.stringify(e.id));
      arrData.push(e);
      getHtmlData(e.name, e.value);
    });

    console.log('data',arrData.length, JSON.stringify(arrData));
      console.log('jsdata',jsData.length, JSON.stringify(jsData));
  } else if (arrData.length < jsData.length) {
    // console.log('------------------------------' );

    // console.log('arrData.length < jsData.length');
    let newData: any = jsData.slice(-1);
    arrData.push(newData);
    newData.forEach((item: any) => {
      getHtmlData(item.name, item.value);

      // console.log('data', JSON.stringify(arrData));
      // console.log('jsdata', JSON.stringify(jsData));
    });
    arrData = [];
    jsData.forEach((e: any) => arrData.push(e));
    // console.log('------------------------------', arrData.length, jsData.length );
  } else if (jsData.length < arrData.length) {
    // console.log('------------------------------');
    // console.log('jsData.length < arrData.length');

    let test: any = [];

    for (const item1 of arrData) {
      let result = false;

      for (const item2 of jsData) {
        if (
          item1.id === item2.id &&
          item1.name === item2.name &&
          item1.value === item2.value
        ) {
          result = true;
          break;
        }
      }

      if (!result) {
        test.push(item1);
        console.log('======>', test);

        let fName = test[0].name;
        console.log('fName = ', fName);

        removeHtmlData(fName);
      }
    }
    // console.log(test[0]);

    arrData = [];
    jsData.forEach((e: any) => arrData.push(e));

    // console.log('data', JSON.stringify(arrData));
    // console.log('jsdata', JSON.stringify(jsData));
  }
  // console.log('data',JSON.stringify(arrData));
  // console.log('jsdata', JSON.stringify(jsData));

  else if (JSON.stringify(arrData) !== JSON.stringify(jsData)) {
    console.log('yes');
    let compare: any[] = [];
    // for (let obj1 of jsData) {
      
    //   const myObj = arrData.find(
    //     (obj2: any) => { obj1.value === obj2.value}
    //   );

    //   if (!myObj || (JSON.stringify(obj1) !== JSON.stringify(myObj)) ) {

    //     compare.push(obj1);
    //     console.log('compare: ', compare);

    //   }
    // }
    
    for (const obj1 of jsData){
      let found = false;
      for (const obj2 of arrData){
        if (obj1.id === obj2.id && obj1.name === obj2.name && obj1.value !== obj2.value){
          compare.push({
            "id": obj1.id,
            "name": obj1.name,
            "value": obj1.value
          });
          found = true;
          updateHtmlData(obj1.name, obj1.value);
          break;
        }
      }
      if (!found){
        // compare.push(obj1);
      }
      console.log('======>', compare);
    }

    arrData = [];
    jsData.forEach((e: any) => arrData.push(e));
  } else {
    console.log('hello');
  }

  // console.log(jsData.length);
  // console.log(arrData.length);
  
};

setInterval(() => {
  fetchData();
}, 3000);
