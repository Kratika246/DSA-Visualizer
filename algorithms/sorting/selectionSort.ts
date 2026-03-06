import { Step } from "@/types/Step";

const SelectionSort = (data: number[])=>{
    let temp=[...data];
    let steps: Step[]=[];
    let sorted:number[]=[];
    let n= data.length;
    let min=0;

    for(let i=0; i<n-1;i++){
        min=i;
        for(let j=i;j<n;j++){
            steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [j,min],
                swapped: false,
                sortedIndices: [...sorted],
            });
            if(temp[j]<temp[min]) min=j;
        }
        [temp[i],temp[min]] = [temp[min],temp[i]];
        steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [i,min],
                swapped: true,
                sortedIndices: [...sorted],
            });
            sorted.push(i);
            steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [],
                swapped: false,
                sortedIndices: [...sorted],
            });
    }
    sorted.push(n-1);
    steps.push({
        type: 'sorting',
        array: [...temp],
        activeIndices: [],
        swapped: false,
        sortedIndices: [...sorted],
    });
    return steps;
}
export default SelectionSort;