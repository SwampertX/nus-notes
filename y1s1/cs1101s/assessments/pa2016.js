// Type your program in here!

// 1A
function is_nucleobase(str) {
    return (str === "G" || str === "A" || str === "T" || str === "C");
}

display(is_nucleobase("Otto"));
display(is_nucleobase("G"));
display(is_nucleobase("B"));
display(is_nucleobase("A"));

// 1B
function is_dna_strand(lst){
    return is_empty_list(lst)
        ? true
        : is_nucleobase(head(lst)) && is_dna_strand(tail(lst));
}

is_dna_strand(list("A", "G", "A"));
is_dna_strand(list("T", "B"));

// 1C
function combine(lol){
    return accumulate(append, [], lol);
}

// 1D
function oxoguanine_repair(dna){
    return map(x=> x==="G"?"8":x, dna);
}

// 1E
function find_gene_start(dna){
    function helper(state){
        if(is_empty_list(dna)){
            return [];
        } else {
            const curr = head(dna);
            if (state === 0){// not yet
                dna = tail(dna);
                return curr === "A"
                    ? helper(1) : helper(0);
            } else if (state === 1) {
                dna = tail(dna);
                return curr === "T"
                    ? helper(2) : helper(0);
            } else if (state === 2) {
                dna = tail(dna);
                return curr === "G"
                    ? helper(3) : helper(0);
            } else {// collect the tail
                return map(x =>x, dna); // new copy
            }
        }
        
    } return helper(0);
}

find_gene_start(list("A", "C", "A", "T", "G", "T", "A", "C"));
// returns list(list("T", "A", "C"))

// 1F
function list_to_array(lst) {
    let A = [];
    let i = 0;
    while(!is_empty_list(lst)){
        A[i] = head(lst);
        i = i + 1;
        lst = tail(lst);
    } return A;
}
function array_to_list(arr){
    const len = array_length(arr);
    let lst = [];
    for(let i=len-1; i>=0; i=i-1){
        lst = pair(arr[i], lst);
    } return lst;
}
function find_gene_end(dna) {
    dna = list_to_array(dna);
    const len = array_length(dna);
    let ans = [];
    for(let i=0; i<len-2; i=i+1){
        if ((dna[i] === "T" && dna[i+1]==="A" && dna[i+2]==="G")
        || (dna[i] === "T" && dna[i+1]==="A" && dna[i+2]==="A")
        || (dna[i] === "T" && dna[i+1]==="G" && dna[i+2]==="A")){
            for(let j=0; j<i; j=j+1){
                ans[j] = dna[j];
            }
            break;
        } else {}
    }
    return array_to_list(ans);
}

find_gene_end(list("A", "T", "A", "C", "T", "A", "G",
"A", "T", "A", "A"));
// returns list(list("A", "T", "A", "C"))

// 1F
function find_gene_end_improved(dna){// output: pair(bef, aft)
    dna = list_to_array(dna);
    const len = array_length(dna);
    let bef = [];
    let aft = [];
    for(let i=0; i<len-2; i=i+1){
        if ((dna[i] === "T" && dna[i+1]==="A" && dna[i+2]==="G")
        || (dna[i] === "T" && dna[i+1]==="A" && dna[i+2]==="A")
        || (dna[i] === "T" && dna[i+1]==="G" && dna[i+2]==="A")){
            for(let j=0; j<i; j=j+1){
                bef[j] = dna[j];
            } for(let j=i+1; j<len; j=j+1){
                aft[j] = dna[j];
            }
            break;
        } else {}
    }
    return pair(array_to_list(bef), array_to_list(aft)); // new copies
}

function all_genes(dna){
    let ans = [];
    let i = 0;
    while(!is_empty_list(dna)){
        let ans_nxt = find_gene_end_improved(find_gene_start(dna));
        if(!is_empty_list(head(ans_nxt))){
            ans[i] = head(ans_nxt);
            i = i+1;
        } else {}
        dna = tail(ans_nxt);
    } return array_to_list(ans);
}

all_genes(list("T", "A", "T", "G", "C", "A", "T",
"A", "A", "G", "T", "A", "G", "A",
"T", "G", "A", "T", "G", "A", "T"));
// returns list(list("C", "A"), list("A"))

// 2A
function inside(num, lst){
    return is_empty_list(lst)
        ? false
        : head(lst) === num || inside(num, tail(lst));
}
function all_different(lst){
    let numbers = [];
    while(!is_empty_list(lst)){
        const num = head(lst);
        if(inside(num, numbers)){
            return false;
        } else {
            lst = tail(lst);
            numbers = pair(num, numbers);
        }
    } return true;
}

all_different(list(2, 6, 1, 7, 6, 4, 3));
all_different(list(2, 5, 1, 6, 7, 4, 3));
all_different(list(23));

// 2B
function is_valid_toto_set(nums, n, min, max){
    if (length(nums) !== n){
        return false;
    } else if (!all_different(nums)){
        return false;
    } else {
        while(!is_empty_list(nums)){
            if (head(nums) < min || head(nums) > max) {
                return false;
            } else {
                nums = tail(nums);
            }
        }
    }
    return true;
}


// 2C
function num_of_matches(numsA, numsB){
    let a = list_to_array(numsA);
    let b = list_to_array(numsB);
    let len_a = array_length(a);
    let len_b = array_length(b);
    let ans = 0;
    for(let i=0; i<len_a; i=i+1){
        for(let j=0; j<len_b; j=j+1){
            if (a[i]===b[j]) {
                ans = ans +1;
            } else {}
        }
    } return ans;
}

var numsA = list(23, 21);
var numsB = list(5, 4, 7);
num_of_matches(numsA, numsB);

// 2D
function check_winning_group(bet_nums, draw_nums, extra_num){
    let n = length(draw_nums);
    let same = num_of_matches(bet_nums, draw_nums);
    if (n===same){
        return 1;
    } else if (same===n-1){
        return inside(extra_num, bet_nums)
            ? 2 : 3;
    } else if (same===n-2) {
        return inside(extra_num, bet_nums)
            ? 4 : 5;
    } else {return 0;}
}

var bet_nums = list(40, 30, 1, 49, 27, 15);
var draw_nums = list(23, 1, 30, 15, 40, 49);
var extra_num = 27;
check_winning_group(bet_nums, draw_nums, extra_num);

// 3A
function evaluate_BAE_tree(bae_tree){
    if (!is_pair(bae_tree)) {
        return bae_tree;
    } else {
        let left = evaluate_BAE_tree(head(bae_tree));
        let right = evaluate_BAE_tree(head(tail(tail(bae_tree))));
        let opr_str = head(tail(bae_tree));
        return opr_str === "+"
            ? left + right
            : opr_str === "-"
                ? left - right
                : opr_str === "*"
                    ? left * right
                    : left / right;
    }
}

var bae_tree = list( list(2, "+", 5), "*", 100 );
evaluate_BAE_tree(bae_tree);

// 3B
function build_BAE_tree(bae_list){
    let next_token = bae_list;
    function build_tree() { // clears a tree, wishful thinking
        if (head(next_token) === "("){
            next_token = tail(next_token);
            let left_tree = build_tree(); // clears a tree
            let op = head(next_token);  // next one is op
            next_token = tail(next_token);
            let right_tree = build_tree(); // clears a tree
            next_token = tail(next_token);// skips closing
            return list(left_tree, op, right_tree);
        }else {
            let token = head(next_token);
            next_token = tail(next_token);
            return token;
        }
    } return build_tree();
}

var bae_list = list("(", "(", 2, "+", 5, ")", "*", 100, ")");
display(build_BAE_tree(bae_list));

// 3C
function evaluate_BAE(bae_list) {
    let bae_tree = build_BAE_list(bae_list);
    return evaluate_BAE_tree(bae_tree);
}

// 3D
function check_parentheses(paren_list){
    let left = 0;
    let right = 0;
    while(!is_empty_list(paren_list)){
        if (head(paren_list) === "("){
            left = left + 1;
        } else {
            right = right + 1;
        }
        if (left < right) {
            return false;
        } else {}
        paren_list = tail(paren_list);
    } return left === right;
}

// var paren_list = list("(", "(", ")", ")");
// check_parentheses(paren_list);
// returns true
