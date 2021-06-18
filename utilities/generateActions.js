export function generateActions(entityname){
  return [
    'updated_list',             // Occurs when a list of items is retrieved or updated
    'updated_list_error',       // Occurs when an attempt to retrieve a list fails
    'loaded',                   // Occurs when the initial list is loaded
    'loaded_error',             // Occurs when the initial list fails
    'added',                    // Occurs when an item is added.
    'added_error',              // Occurs if there is an error adding an item
    'updated',                  // Occurs when an item is updated
    'updated_error',            // Occurs if there is an error updating and item
    'deleted',                  // Occurs when an item is deleted
    'deleted_error',            // Occurs when there is an error deleting an item
    'invalidate'                // Occurs when the reducer is invalidated and marked for reloading
  ].reduce((acc, action)=>{
    acc[`entity_${action}`.toUpperCase()] = `${entityname}_${action}`.toUpperCase();
    return acc;
  }, {});
}
