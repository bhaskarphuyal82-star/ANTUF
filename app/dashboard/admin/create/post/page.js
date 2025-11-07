import React from "react";
import Articles from "@/components/admin/Articles/Articles"


const Content = () => {
    return (
        <div
            style={{
                padding: "20px",

                borderRadius: "8px",

            }}
        >
        
            <Articles />
            {/* Add your form or content for creating a post here */}
        </div>
    );
};

export default Content;
