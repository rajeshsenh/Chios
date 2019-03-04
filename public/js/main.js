$(function() {



    /* GENERIC PLUGIN INITIALIZATION */

    let $tags_menu_clone = $( ".chiostaskblock__main select[name='task_tags']" ).clone();

    $( ".chiostaskblock__main select[name='task_tags']" ).selectmenu({
        change : function( event , ui ) {
            console.log( ui.item.value );


            var val = $.trim(ui.item.value);
    
            if( val === 'all' ) {
             $('ul > li').show()
                return;
            }
   
            $('ul.chiostaskblock__maintasklist > li')
                .hide()
                .filter( ( i , _e ) => {
                    return val === $.trim($(_e).data('database-tags'));  
                })
                .show();

        }
    });

    setTimeout( () => {
        MicroModal.init();        
    } , 3000 );

    fetch('/gettaskstodisplay' , {
        method: "POST"
    }) 
    .then( ( resp ) => {
        return resp.json();
    })
    .then( ( data ) => {
        console.log(data);

        data.forEach( ( e , i ) => {
            // console.log(e.task);
            if( e.task ) {
                $('.chiostaskblock__maintasklist').append(`<li 
                    data-database-id="${e.id}"
                    data-database-tags="${e.tags}">${e.task}
                    <button class="edit fa fa-eye" data-micromodal-trigger="chios__edittaskmicromodal"></button>
                    <button class="delete fa fa-trash" data-micromodal-trigger="chios__deletetaskmicromodal"></button>
                </li>`);                
            }
        });

    })
    .catch( ( err ) => {
        console.log( err );                
    });   

    $(document).on('click' , '.chios__addtaskmicromodal .modal__btn-primary' , (e) => {

        e.preventDefault();

        fetch('/addnewtask' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    'task' : $('.chios__addtaskmicromodal input[name="add__task"]').val(),
                    'tags' : 'office' 
                })
            })
            .then( ( resp ) => {
                console.log( resp.body );
            })
            .catch( ( err ) => {
                console.log( err );                
            });

    });

    let id_of_record = null;


    $(document).on( 'click' , '.chios__edittaskmicromodal .modal__btn-primary' , function(e){
        e.preventDefault();

        let tasktexttoupdate = $.trim($('.chios__edittaskmicromodal .modal__content input').val());

        fetch('/updatetasktodisplay' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( { 'updatetaskid' : id_of_record , 'updatetasktext' : tasktexttoupdate  } )
        }).then( ( resp ) => {
            return resp.json();     
        }).then( ( resp ) => {
            console.log(resp);
           // $('.chios__edittaskmicromodal input[type="text"]').val( resp[0].task );     
        })
        .catch( ( err ) => {
            console.log( err );                
        });

    });

    $(document).on('click' , '.chiostaskblock__maintasklist > li .delete , .chiostaskblock__maintasklist > li .edit' , (e) => {
        id_of_record = +($(e.currentTarget).closest('li').data('database-id'));

        if( $(e.currentTarget).hasClass('edit') ) {

            fetch('/edittaskstodisplay' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( { 'edittaskid' : id_of_record } )
            }).then( ( resp ) => {
                return resp.json();     
            }).then( ( resp ) => {
                console.log(resp[0].task);
                $('.chios__edittaskmicromodal input[type="text"]').val( resp[0].task );     
            })
            .catch( ( err ) => {
                console.log( err );                
            });

        }

    });

    $(document).on('click' , '.chios__deletetaskmicromodal button.modal__btn-danger' , function( e ) {

        fetch('/deletetaks' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 'deleterecordid' : id_of_record }) 
        })
        .then( ( resp ) => {
            console.log( resp.body );
            $('.chiostaskblock__maintasklist > li[data-database-id='+ id_of_record +']').remove();       
        })
        .catch( ( err ) => {
            console.log( err );                
        });

    });

    $('.overlay , .edit__task__modal .warning , .edit__task__modal .success').on('click' , (e) => {
        $('.edit__task__modal , .overlay').removeClass('show');
    });

    $('.chiostaskblock__main button').on('click' , (e) => {

        if( !$('#chios__addtaskmicromodal .modal__content > div:eq(1) select').length ) {
            $tags_menu_clone
                .appendTo( $('#chios__addtaskmicromodal .modal__content > div:eq(1)') );
                
            $('#chios__addtaskmicromodal .modal__content > div:eq(1) select').selectmenu({
                change : function( event , ui ) {
                    console.log( ui.item.value );
        
                }
            });    
        }
        
    });


});