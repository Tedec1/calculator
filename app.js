let stored = null;
let running = null;
let shown = '';
let memory = null;
let mem = {
    clear(){
        memory = null;
    },
    add(){
        memory += running;
    },
}
let currentOp = '';
let op = {
    add(){
        running = running === null ? stored : running + stored;
        $('.next-operation').text($('.add').text()).css('color','black').addClass('add').removeClass('div').removeClass('mul').removeClass('sub');
        stored = null;
        shown = '';
        updateAll();
    },subtract(){
        running = running === null ? stored : running - stored;
        $('.next-operation').text($('.subtract').text()).css('color','black').addClass('sub').removeClass('div').removeClass('mul').removeClass('add');
        stored = null;
        shown = '';
        updateAll();
    },multiply(){
        running = running === null ? stored : running * stored;
        $('.next-operation').text($('.multiply').text()).css('color','black').addClass('mul').removeClass('div').removeClass('sub').removeClass('add');
        stored = null;
        shown = '';
        updateAll();
    },divide(){
        running = running === null ? stored : running / stored;
        $('.next-operation').text($('.divide').text()).css('color','black').addClass('div').removeClass('mul').removeClass('sub').removeClass('add'); 
        stored = null;
        shown = '';
        updateAll();
    }
}
function updateAll(){
    updateRunning();
    updateShown();
}
function clearOp(){
    $('.next-operation').text('').removeClass('div').removeClass('mul').removeClass('sub').removeClass('add');
}
function updateRunning(){
    $('.held-value').text(running);
}
function updateShown(){
    $('.next-value').text(stored);
}
$('.digits button').click(function onClick(){
    if(shown.length <= 13){
        if($(this).hasClass('decimal')){
            shown += stored=== null ? '0.': '.'; 
        } else {
            shown += $(this).text();
        }
        stored = Number(shown);
        updateShown()
    }
})
$('.clear-entry').click(function onClick(){
    stored = null;
    shown = '';
    updateShown();
})
$('.operations button').click(function onClick(){
    switch($(this).attr('class')){
        case 'add': op.add();
        break;
        case 'subtract': op.subtract();
        break;
        case 'multiply': op.multiply();
        break;
        case 'divide': op.divide();
    }
});

$('.clear-all').click(()=>{
    stored = null;
    running = null;
    shown = '';
    currentOp = '';
    clearOp();
    updateAll();
})

$('.equals').click(()=>{
    if ($('.next-operation').hasClass('mul')){
        running *= stored;
        stored = null;
        clearOp();
        updateAll();
    }else if ($('.next-operation').hasClass('div')){
        running /= stored;
        stored = null;
        clearOp();
        updateAll();
    } else if ($('.next-operation').hasClass('add')){
        running += stored;
        stored = null;
        clearOp();
        updateAll();
    }else if ($('.next-operation').hasClass('sub')){
        running -= stored;
        stored = null;
        clearOp();
        updateAll();
    }
})
