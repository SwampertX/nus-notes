// 2003 - 2145
// 1A
function make_2D_zero_array(rows, cols){
    let A = [];
    for(let i=0; i<rows; i=i+1){
        A[i] = [];
        for (let j=0; j<cols; j=j+1) {
            A[i][j]=0;
        }
    }
    return A;
}

make_2D_zero_array(3, 5);

// 1B
let directions = [
        [-1, 0], // left
        [1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1,-1],
        [-1,1],
        [-1,-1]];

function num_of_live_neighbours(game, n, r, c){
    let ans = 0;
    for(let i=0; i<8; i=i+1){
        let x = r + directions[i][0];
        let y = c + directions[i][1];
        x = ((x+n)%n);
        y = ((y+n)%n);
        if (game[x][y] === 1) {
            ans = ans + 1;
        } else {}
    }
    return ans;
}

var game1 = [[0,0,0,0],[0,1,0,0],[0,0,1,1],[0,0,0,1]];
num_of_live_neighbours(game1, 4, 1, 0);

// 1C
function next_generation(game, n){
    let next = make_2D_zero_array(n,n);
    for(let i=0; i<n; i=i+1){
        for(let j=0; j<n; j=j+1){
            let neigh = num_of_live_neighbours(game, n, i, j);
            let alive = (game[i][j] === 1);
            if(alive && (neigh === 3 || neigh === 2)){
                next[i][j] = 1;
            } else if (!alive && neigh === 3){
                next[i][j] = 1;
            } else {}
        }
    }
    return next;
}
next_generation(game1, 4);

var game2 = [[0,0,0,0,0],
            [0,1,1,1,0],
            [0,0,1,0,0],
            [0,1,1,1,0],
            [0,0,0,0,0]];
next_generation(game2, 5);

// 2A
function make_first_line(words, page_width){
    let wordss = words;
    let left = page_width;
    let line = "";
    // we add the first word first
    let word = head(words);
    if(left < word.length){
        return pair("", wordss); // cannot fit
    } else {
        line = line + word;
        left = left - word.length;
        wordss = tail(wordss);
    }
    while(!is_empty_list(wordss) && left>0){
        // here onwards add space then word
        word = head(wordss);
        if(left - word.length - 1 < 0){
            return pair(line, wordss);
        } else {
            line = line + " " + word;
            left = left - word.length - 1;
            wordss = tail(wordss);
        }
    } return pair(line, wordss);
}

// var words = list("aa", "bbb", "cccc", "ddd", "ee");
// make_first_line(words, 13);

// 2B
function make_lines(words, page_width){
    let words_left = words;
    let page = [];
    while(!is_empty_list(words_left)){
        let curr_line = make_first_line(words_left, page_width);
        page = pair(head(curr_line), page);
        words_left = tail(curr_line);
    } return reverse(page);
}
var words = list("aa", "aaaa", "aa", "aaaa", "aa",
"bbbb", "bb", "bbb", "bbbbb",
"cccc", "ccccc", "cccc",
"dddddd", "dd", "ddd", "dd",
"eeee", "eee", "eeee", "eee",
"ff", "ffff", "ffff", "fffff",
"ggggg", "gg");
// make_lines(words, 18);

// 2C
function take(n, lst){
    return n===0 || is_empty_list(lst)
        ? []
        : pair(head(lst), take(n-1, tail(lst)));
}
function drop(n, lst){
    return n===0 || is_empty_list(lst)
        ? lst
        : drop(n-1, tail(lst));
}
function make_pages(lines, page_height){
    let lines_left = lines; // list of strings
    let pages = [];
    while(!is_empty_list(lines_left)){
        pages = pair(take(page_height, lines_left), pages);
        lines_left = drop(page_height, lines_left);
    }
    return reverse(pages);
}

var lines = list("aa aaaa aa aaaa aa",
"bbbb bb bbb bbbbb",
"cccc ccccc cccc",
"dddddd dd ddd dd",
"eeee eee eeee eee",
"ff ffff ffff fffff",
"ggggg gg");
make_pages(lines, 3);

// 2D
function page_format(words, page_width, page_height){
    let lines = make_lines(words, page_width);
    return make_pages(lines, page_height);
}
page_format(words, 18, 3);

// 3A
function is_prefix_of(sub, seq){
    if(length(sub) > length(seq)){
        return false;
    } else if(is_empty_list(sub)){
        return true;
    } else {
        return head(sub) === head(seq) && is_prefix_of(tail(sub), tail(seq));
    }
}

// 3B
function sublist_replace(new_sub, old_sub, seq){
    const old_sub_len = length(old_sub);
    function helper(seq){
        if(is_empty_list(seq)){
            return [];
        } else if(!is_prefix_of(old_sub, seq)){
            return pair(head(seq), helper(tail(seq)));
        } else {
            return append(new_sub, helper(
                                drop(old_sub_len, seq)));
        }
    } return helper(seq);
}
sublist_replace(list("x", "y"), list("p", "q", "r"),
list("a", "b", "a", "b", "a", "b", "a"));

// 4A
function is_subseq_at(sub, seq, start_pos){
    const sublen = sub.length;
    if(sublen + start_pos > seq.length){
        return false;
    } else {
        for(let i=0;i<sublen; i=i+1){
            if (seq[start_pos + i] !== sub[i]){
                return false;
            } else {}
        } return true;
    }
}
is_subseq_at([],
["a", "b", "c"], 1);

// 4B
function arr_take(n, arr){
    let A = [];
    for(let i=0; i<n; i=i+1){
        A[i] = arr[i];
    } return A;
}
function arr_drop(n, arr){
    let A = [];
    for(let i=n; i<arr.length; i=i+1){
        A[i-n] = arr[i];
    } return A;
}
function arr_merge(arr1, arr2){
    let A = [];
    let pad = arr1.length;
    for(let i=0; i<arr1.length; i=i+1){
        A[i] = arr1[i];
    } for(let i=0; i<arr2.length; i=i+1){
        A[i+pad] = arr2[i];
    } return A;
}
function subarray_replace(new_sub, old_sub, seq){
    let i=0;
    while(i<seq.length){
        if(is_subseq_at(old_sub, seq, i)){
            seq = arr_merge(arr_take(i, seq),
                arr_merge(new_sub, 
                    arr_drop(i+old_sub.length, seq)));
            i = i + new_sub.length;
        } else {i = i + 1;}
    } return seq;
}
var seq = ["a", "b", "a", "b", "a", "b", "a"];
subarray_replace(["x", "y"], ["a", "a"], seq);
