function getRandomInt(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

function getArray(n) 
{
    let arr = []
    for(let i = 0; i < n; i++) arr.push(getRandomInt(1, 30))
    return arr
}

function getResultArray(arr) {}

// 1
$('#otv').on('click', solveOne)

function solveOne() 
{
    let line = $('#line').val() * 1
    if (line <= 0) alert("Введите значения больше нуля!")
    else $('#result').html(line * line)
}

// 2
$('#chast').on('click', solveTwo)

function solveTwo() 
{
    let N1 = $('#chast1').val() * 1
    let N2 = $('#chast2').val() * 1
    let k = 1
    let m = 101
    if (N1 > 5)
    {
        for (let i = 3; i <= N1; i += 2) k += i
        if (N1 % 2 == 0) k += N1
    }
    else k = 9
    if (N2 > 103)
    {
        for (let i = 103; i <= N2; i += 2) m += i
        if (N2 % 2 == 0) m += N2
    }
    else m = 204
    $('#chast-result').html(k/m)

}

// 3
var matrix = []

$('#matrix').on('click', makeMatrix)
$('#make-magic').on('click', makeMatrix)
$('#make-magic').on('click', verifyMatrix)

function printMatrix(el, arr) 
{
    let element = $(el)
    element.html('')
    
    for (let i = 0; i < arr.length; i++) 
    {
        element.append(`<div class="${el} row-${i} zzz"></div>`)

        for (let j = 0; j < arr[i].length; j++) 
        {
            $(`${el} .row-${i}`).append(`<div>${arr[i][j]}</div>`)
        }
    }
} 

function makeMatrix() 
{
    let n = $('#sq-matrix').val() * 1
    if(n < 1) alert("Неверное выражение, введите число больше нуля.")

    matrix = []

    for(let i = 0; i < n; i++) 
    {
        matrix.push([])
        for(let j = 0; j < n; j++)
            matrix[i].push(getRandomInt(1, 30)) // можно поставить (1, 1), будет единичная матрица, но она будет "некрасивым магическим квадратом"
    }

    printMatrix('#matrix-print', matrix)
}

$('#magic-matrix').on('click', verifyMatrix)

function verifyMatrix() // при n=1 матрица всегда будет магической.
{
    let n = $('#sq-matrix').val() * 1
    if (n > 0)
    { 
        let prov = 0
        let sum_d_1 = 0
        let sum_d_2 = 0
        for (let i = 0; i < n; i++) prov += matrix[i][i]
        for (let i = 0; i < n; i++)
        {
            for (let j = 0; j < n; j++)
            {
                sum_d_1 += matrix[i][j]
                sum_d_2 += matrix[j][i]
            }
            if (sum_d_1 != prov || sum_d_2 != prov)
            {
                $('#magic').html("Нет:(")
                return
            }
            sum_d_1 = 0
            sum_d_2 = 0
        }
        for (let i = 0; i < n; i++) sum_d_1 += matrix[i][n-i-1]
        if (sum_d_1 != prov)
        {
            $('#magic').html("Нет:(")
            return
        }
        $('#magic').html("Да!")
    }
}

// 4
$('#snake').on('click', MatrixSnake)
function MatrixSnake() 
{
    let n = $('#matrix-size').val() * 1
    if(n < 1) alert("Неверное выражение, введите число больше нуля.")

    let arr = getArray(n * n)
    arr.sort((a, b) => b - a)

    let matrix = []
    for (let i = 0; i < n; i++) matrix.push([])

    let prov = 1 // 1 ->, -1 <-

    for (let i = 0 ; i < n; i++) 
    {
        for (let j = 0; j < n; j++) 
        {
            if (prov == -1)  matrix[n-i-1][n-j-1] = arr.pop() 
            else if (prov == 1) matrix[n-i-1][j] = arr.pop()
        }
            prov = -prov
    }

    printMatrix('#snake-output', matrix)
}