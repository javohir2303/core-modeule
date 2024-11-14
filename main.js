const fs = require("fs")
const path = require("path")

function folderYasovchiFunction(...folderParametr){
    if (folderParametr.length > 0) {
        for (let i = 0; i < folderParametr.length; i++) {
            const element = folderParametr[i]
            const folderLokation = path.resolve(`${element}`)
            fs.mkdir(folderLokation, (err)=>{
                if (err) {
                    console.log(`${folderLokation} : bu folder yaratilib bo'lingan...`)
                } else {
                    console.log(`${folderLokation} : nomli folder yaratildi...`)
                }
            })
        }
    } else {
        console.log("folder nomini kirting...")
    }
}







const newCar = { id: 8, model: "audi", price: 1000 }     // car (malumoti)
const fileCars = path.join(__dirname, "cars.json")

function fileYaratishFunction(dataMalumot) {
    fs.readFile(fileCars, { encoding: 'utf8' }, (err, fileData) => {
        let cars = []
        
        if (err) {
            console.log("file yaratildi...")
        } else {
            try {
                cars = JSON.parse(fileData)
            } catch (err) {
                console.error("JSON formatida xatolik:", err.message)
            }
        }
        
        cars.push(dataMalumot)
        
        fs.writeFile(fileCars, JSON.stringify(cars, null, 2), { encoding: 'utf8' }, (error) => {
            if (error) {
                console.error("nosozlik : ", error)
            } else {
                console.log(`${fileCars} : ma'lumot qo'shildi...`)
            }
        });
    });
}







function DataMalumotlarOlish() {
    fs.readFile(fileCars, { encoding: 'utf8' }, (err, data) => {
        if (!err) {
            try {
                const cars = JSON.parse(data)
                console.log("data malumotlari : ", cars)
            } catch (parseErr) {
                console.log("file json formatda emas : ", parseErr)
            }
        } else {
            console.log("file da xatolik mavjud:", err)
        }
    });
}








function DataMalumotniOchirish(id) {
    fs.readFile(fileCars, { encoding: 'utf8' }, (err, fileData) => {
        if (err) {
            console.log("nosozlik : ", err)
            return
        }
        
        try {
            let cars = JSON.parse(fileData)
            
            const filteredCars = cars.filter(car => car.id !== id)
            
            if (filteredCars.length === cars.length) {
                console.log(`ID ${id} bunday malumot ochirib bolingan...`)
                return
            }
            
            fs.writeFile(fileCars, JSON.stringify(filteredCars, null, 2), { encoding: 'utf8' }, (error) => {
                if (error) {
                    console.log("nosozlik : ", error);
                } else {
                    console.log(`ID ${id} bundagi malumot ochirildi...`)
                }
            })
        } catch (err) {
            console.log("nosozlik : ", err.message);
        }
    });
}



// folderYasovchiFunction("flowers","cars")     // folder yasaydigan funksiyasi
// fileYaratishFunction(newCar) // file ga malumot qoshish funksiyasi
// DataMalumotlarOlish()        // file dagi malumotlarni oladigan funksiyasi
// DataMalumotniOchirish(5)     // id orqali malumotni ochirish funksiyasi