import { Outlet } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPet } from '../shumin/slices/PetSlice';
import axios from "axios";

function Pet(){
    const dispatch = useDispatch();
    const pets = useSelector((state)=>state.pets);

    useEffect(()=>{
        const getPets = async () =>{
            try{
                const petsResponse = await axios.get(
                    "http://localhost:4000/api/pet"
                );
                if(petsResponse.status === 200){
                    const updatedPets = petsResponse.data.map(pet => ({
                        ...pet,
                        hidden: pet.stockLevel === 0 ? true : false
                    }));
                    dispatch(setInitialPet(updatedPets));
                }else{
                    console.log(petsResponse);
                }
            }catch(error){
                // Perform neccessary action;
            }
        };
        getPets();
    },[pets.length,JSON.stringify(pets.map(item => item.stockLevel))]);

    return <Outlet/>
}

export default Pet;