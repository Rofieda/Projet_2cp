import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjetList = () => {
    const [projets, setProjets] = useState([]);

    useEffect(() => {
        const fetchProjets = async () => {
            try {
                const response = await axios.get('/api/projetByChercheur/');
                setProjets(response.data);
            } catch (error) {
                console.error('Error fetching projets:', error);
            }
        };

        fetchProjets();
    }, []);

    return (
        <div>
            <h1>Votre liste des projets</h1>
            <ul className="publication-list">
                {projets.map(projet => (
                    <li key={projet.id}>
                        <span>{projet.titre_projet}</span>
                        <span>{projet.domaine}</span>
                        <span>{projet.annee_debut}</span>
                        <span>{projet.annee_fin}</span>
                        {/* Add buttons for modification and deletion */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjetList;