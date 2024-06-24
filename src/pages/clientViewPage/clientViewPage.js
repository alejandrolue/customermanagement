import React, {useEffect, useState} from "react"
import "./clientViewPage.css"
import {useLocation} from "react-router-dom";
import {collection, doc, getDocs} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import WeightGraph from "../../components/customerComponents/clientCharts/weightGraph/weightGraph";

export default function ClientViewPage() {
    const location = useLocation()
    const client = location.state
    const id = client.id
    const [treatmentTableList, setTreatmentTableList] = useState([])
    const treatmentTableListRef = collection(db, "clients", id, "treatmentTable")
    const [treatmentsList, setTreatmentsList] = useState([])
    const [sortedList, setSortedList] = useState([])

    const [sortedDatesAndWeights, setSortedDatesAndWeights] = useState([]);
    const [weightChange, setWeightChange] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getTreatmentList = async () => {
            try {
                const data = await getDocs(treatmentTableListRef);
                const list = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))

                setTreatmentTableList(list)

                const subCollectionTreatmentsPromises = list.map(async (doc) => {
                    const subCollectionTreatmentsRef = collection(treatmentTableListRef, doc.id, "treatments");
                    const subCollectionTreatmentsSnapshot = await getDocs(subCollectionTreatmentsRef);

                    return subCollectionTreatmentsSnapshot.docs.map(subDoc => ({
                        ...subDoc.data(),
                        id: subDoc.id,
                        tableId: doc.id
                    }));
                });

                const subCollectionTreatments = await Promise.all(subCollectionTreatmentsPromises);
                const flattenedTreatments = subCollectionTreatments.flat();
                setTreatmentsList(flattenedTreatments);

                const sorted = flattenedTreatments.sort((a, b) => new Date(a.date) - new Date(b.date));
                const weightDifference = sorted.sort((a,b) => new Date(a.date) - new Date(b.date))
                if (weightDifference.length > 1) {
                    const firstWeight = weightDifference[0]["weight"]
                    const getLastWeight = weightDifference.slice(-1)
                    const lastWeight = getLastWeight[0]["weight"];
                    setWeightChange(lastWeight - firstWeight)
                }
                setSortedList(sorted)
            } catch (err) {
                console.log(err)
            }
        }
        getTreatmentList()
    }, []);
    return (
        <div className="clientView-container">
            <div className="clientView-body">
                <div className="clientView-clientInfo">
                    <h2>{client.firstName} {client.lastName}</h2>
                </div>
                <div className="clientView-clientTreatment">
                    <WeightGraph data={sortedList}/>
                </div>
                <div className="clientView-clientInfo">
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            {weightChange !== null && (
                                <div>
                                    <h4>
                                        Weight Change since treatment
                                        start: {weightChange > 0 ? `gained ${weightChange} kg` : `lost ${Math.abs(weightChange)} kg`}
                                    </h4>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}