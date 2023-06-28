// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna){
  // 
  return {
    // fixe values go here 
    specimenNum:specimenNum,
    dna:dna,
    // lets do some !!Science!!
    mutate:()=>{
      let randomBaseID = Math.floor(Math.random() * dna.length);
      let newBase;
      do{
        const dnaBases = ['A', 'T', 'C', 'G'];
        newBase= dnaBases[Math.floor(Math.random() * 4)];
      } while (newBase === dna[randomBaseID]);
      dna[randomBaseID] = newBase;
      return dna;
    },

    // function takes another instance of the object and iterates thought both of their dna arrays and compares them. it counts the matches. 
    compareDNA:(pAequor)=>{
        let matchCount = 0;
        for(i=0;i<dna.length;i++){
          if(dna[i]===pAequor.dna[i]){
            matchCount++
          }
        }
        // divide the number of matches against the length of the dna array and multiply it by 100 to give us the percentage
        let percentMatch = (matchCount/dna.length)*100
        // console log as per requirement 
        console.log (`Specimen #${specimenNum} and Specimen #${pAequor.specimenNum} have ${percentMatch}% DNA in common`)
        return percentMatch; // added this for the further challenge relationship building 
    },
    // measures the survivability of the oganism by counting the C and G bases
    willLikelySurvive: ()=> {
      let countOfCOrG = 0;
      dna.forEach(base => {if(base==="C"||base==="G"){countOfCOrG++}}
       );
       // the criteria is over 60% c or g so divide count by dna length and return if it is over 0.6 (60%)
       return (countOfCOrG/dna.length)>=0.6;     
    },
    // further challenge section
    // iterates through the dna and uses a switch statmenr to swap c fo g and a for t and vice versa
    complementStrand:()=>{
      return dna.map(base=>{
        switch (base){
          case "A": return "T"
          case "T": return "A"
          case "C": return "G"
          case "G": return "C"
        }
      })
    }
  }
    
}


/// generate 30 organisms that will survive for the team
function make30(){
  let i=0;
  let petriDish=[];
  while(i<30){
    let pAequor = pAequorFactory(i, mockUpStrand());
    // test if the organism will likely survive, add it to the list if not the organism is discarded
    if(pAequor.willLikelySurvive()){
      petriDish.push(pAequor); 
      i++;
    }
  }
  // return the 30 survivors
  return petriDish
}

function findMostRelated(arr){
    // the aim here is to create a list of the closest matches for each elemenr and the highest existing match
    // these are stored in the below varibales
  let resultArrray = [];
  let maxScore=0;
  // nested loop to check the element of the array against the other elemenets

  // outside loop to go through each element
  for (let i = 0; i<arr.length;i++){
    
    // set up a small object to hold the result and the id of the matching item
    let result={id1:i, id2:0, score:-0}
    // insdie loop to go through the elements to compare
    for (let ii = 0; ii<arr.length;ii++){
      // skip the current iteration if its the same element in the array
      if(i===ii){continue} 
      // store the current comparison score
      let currentScore=arr[i].compareDNA(arr[ii]);

      // if the current scire is larger than the one in the results object      
      if (currentScore>result.score){
        // if it is then sort this elements location in the array along with the score
        result.id2 = ii;
        result.score = currentScore;
      }
    }
    // after we exit the inner loop store the results object that now containstthe information about the closest match
    resultArrray.push(result)
    // also compare the result object score to the maxScore variable if its bigger replace it
    if (result.score>maxScore){maxScore = result.score} // alternative approach would be to use Array.reduce() to get the max score.

  }
  // filter the results by the max score takes the first pair that match
  let outputResult= resultArrray.filter(result=>result.score===maxScore)[0];
  let specimin1 = arr[outputResult.id1];
  let specimin2 = arr[outputResult.id2];
  // final output 
  console.log(`The closes releations are specimin #${specimin1.specimenNum} and specimin #${specimin2.specimenNum} at ${maxScore}%.`)
  return outputResult

}


// tests
//console.log(pAequorFactory (1,mockUpStrand()));

// example pAequors with fixed DNA
const sample0 = pAequorFactory (1, ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']) 
const sample1 = pAequorFactory (1, ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']) 
const sample2 = pAequorFactory (2, ['A', 'A', 'A', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'])

// tests 
// muation 
console.log(sample0.dna)         // returns all as
console.log (sample0.mutate())  // returns all as but 1
console.log(sample0.dna)        // returns all as but 1




sample1.compareDNA(sample2)//should saye the result is 20%
sample1.compareDNA(sample1)//should saye the result is 100%

console.log(sample1.willLikelySurvive())// should return false
console.log(sample2.willLikelySurvive())// should return true


// tests on wild pAequors with random dna
const sample3 = pAequorFactory (3, mockUpStrand())
const sample4 = pAequorFactory (4, mockUpStrand())
sample3.compareDNA(sample4) // should give a dfferent answer each run
console.log(sample3.willLikelySurvive())// should give a dfferent answer each run
console.log(sample4.willLikelySurvive())// should give a dfferent answer each run

console.log (sample3.dna)
console.log (sample3.mutate())
console.log (sample3.dna)

//******************************************************************************


// return results for test
const collectionOf30 = make30();




// extra challenge tests
console.log(sample1.complementStrand()) // all 'T's

// print a strand and the complement
console.log(sample3.dna)
console.log(sample3.complementStrand())


// test the smae batch these tens to be a bit samey so gravitate to around 60
findMostRelated(collectionOf30);


// tests 100 times against non-viable to see if we are getting a spread of results highest i saw was 80% lowest 53.333333333333336%.
// commented out for now as as is will fill the log and obsure the other results. 
// for best results comment out the comment.log in compareDNA in pAequorFactory . 
/* for(let i = 0; i<100;i++){
  let coll = [];
  for(ii = 0;ii<=30;ii++){
    coll.push(pAequor = pAequorFactory(ii, mockUpStrand()));
  }

  //console.log(collectionOf30)
  findMostRelated(coll);  
} */