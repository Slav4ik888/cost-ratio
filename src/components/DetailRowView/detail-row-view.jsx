import React from 'react';

export const DetailRowView = ({company}) => (
   <div>
      <p>Компания<b>{company.organization}</b></p>
      <p>SiteID:<b>{company.siteID}</b></p>
      <p>Проект: <b>{company.project}</b></p>
   </div>
)