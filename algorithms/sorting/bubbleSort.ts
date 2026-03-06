
import { Step } from "@/types/Step";
const bubbleSort = (data : number[]) => {
    let temp=[...data];
    let steps: Step[]=[];
    let sorted:number[]=[];
    let n= data.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [j,j+1],
                swapped: false,
                sortedIndices: [...sorted],
            });
            if(temp[j]>temp[j+1]){
                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                steps.push({
                    type: 'sorting',
                    array: [...temp],
                    activeIndices: [j,j+1],
                    swapped: true,
                    sortedIndices: [...sorted],
                });
            }
        }
        sorted.push(n-i-1);
        steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [],
                swapped: false,
                sortedIndices: [...sorted],
            });
    }
    sorted.push(0);
        steps.push({
                type: 'sorting',
                array: [...temp],
                activeIndices: [],
                swapped: false,
                sortedIndices: [...sorted],
            });
    return steps;
}

export default bubbleSort;