

//      site_index          site_home

const site_index = (req,res) => {
    const user = res.locals.user 
    if(user){
        res.redirect('/home')
    }else{
        res.render('index')
    }

}
const site_home = (req,res) => {
    const user = res.locals.user 
    if(user){
        res.render('index2')
    }else{
        res.redirect('/')
    }
}


module.exports = {site_home,site_index}