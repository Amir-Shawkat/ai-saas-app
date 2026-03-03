'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useEffect, useState } from "react";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { subjects } from "@/constants";



const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"]
            });
        } else {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject
            });
        }
        router.push(newUrl, { scroll: false });
    }, [subject, router]);

  return (
    <Select onValueChange={(value) => setSubject(value)} defaultValue={subject} value={subject}>
        <SelectTrigger className="input capitalize">
            <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all" className="capitalize">All Subjects</SelectItem>
            {subjects.map((subject) => (
                <SelectItem key={subject} value={subject} className="capitalize">
                    {subject}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    );
}

export default SubjectFilter;