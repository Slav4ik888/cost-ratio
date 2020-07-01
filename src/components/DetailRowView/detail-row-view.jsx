import React from 'react';

export const DetailRowView = ({result}) => (
   <div>
      {result.map((item, i) => 
         <p key={item.siteID + i}>SiteID<b>{item.siteID}</b></p>
      )}
      
   </div>
);
