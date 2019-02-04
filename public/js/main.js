$(function() {



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
                $('.chiostaskblock__maintasklist').append(`<li data-database-id="${e.id}">${e.task}
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
                    'tags' : $('.chios__addtaskmicromodal select[name="task_tags"]').val() 
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

    $(document).on('click' , '.chiostaskblock__maintasklist > li .delete , .chiostaskblock__maintasklist > li .edit' , (e) => {
        id_of_record = +($(e.currentTarget).closest('li').data('database-id'));

        if( $(e.currentTarget).hasClass('edit') ) {

            fetch('/edittaskstodisplay' , {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( { 'edittaskid' : id_of_record } )
            })
            .then( ( resp ) => {
                return resp.json();     
            }).then( ( resp ) => {
                $('.chios__edittaskmicromodal input[type="text"]').val( resp.task );     
            })
            .catch( ( err ) => {
                console.log( err );                
            });

        }

    });

    $(document).on('click' , '.chios__deletetaskmicromodal button.modal__btn-danger' , function( e ) {

        id_of_record

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

    $('select').selectize({
        maxItems: 3
    });

});