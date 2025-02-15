import { response } from "express";

const asyncHandler = async(func) => {
    await func(errors, req, res, next).then(
        res.status(err.code || 500).json({
            success : true, 
            message: err.message
        })
    ).catch((err) => {
        console.log(err); 
        res.status(err.code || 500).json({
            success : false, 
            message: err.message
        })
    })
}

export {asyncHandler};






// const asyncHandler = (func) => async(err, req, res, next) => {
//     try{
//         await func(req, res, next);
//     }catch(err){
//         console.log(err);
//         res.status(err.code || 500).json({
//             success: false, 
//             message: err.message
//         });
//     }
// } // higher order functions

// wrapper function...this is because u might need to talk to the database using 
// video controller etc. 