// import React from 'react'
// import { Card, Typography, Row, Col, Progress, Rate, Tag } from 'antd'
// import { format } from 'date-fns'

// function RatedItem({ movie }) {

//   return (
//     <Card hoverable className="card">
//       <Row gutter={[16, 16]}>
//         <Col span={10}>
//           <div className="image-container">
//             {poster_path ? (
//               <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} className="image" />
//             ) : (
//               <span>Постер не загружен</span>
//             )}
//           </div>
//         </Col>
//         <Col
//           span={14}
//           style={{ padding: 12, display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between' }}
//         >
//           <Row span={10}>
//             <Col span={20} style={{ maxWidth: '205px' }}>
//               <div style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                 <Typography.Text copyable style={{ lineHeight: '30px' }}>
//                   {truncateText(title, 25)}
//                 </Typography.Text>
//               </div>
//               <div>
//                 <span className="date">{formattedReleaseDate}</span>
//               </div>
//               <div className="genres-container">
//                 {movieGenres && movieGenres.length > 0 ? (
//                   movieGenres.slice(0, 2).map((genre) => (
//                     <Tag key={genre} className="genres">
//                       {genre}
//                     </Tag>
//                   ))
//                 ) : (
//                   <span>Ошибка обработки жанров</span>
//                 )}
//               </div>
//               <div>
//                 <Paragraph className="description">{truncateText(overview, 167)}</Paragraph>
//               </div>
//             </Col>

//             <Col span={4}>
//               <Progress
//                 type="dashboard"
//                 percent={movieRate}
//                 size={30}
//                 format={(percent) => Math.round(percent * 10) / 100}
//                 strokeColor={movieRateColor}
//               />
//             </Col>
//           </Row>
//           <Row span={10}>
//             <Col span={24}>
//               <div>
//                 <Rate allowHalf count={10} style={{ fontSize: '16px' }} value={vote_average} />
//               </div>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Card>
//   )
// }
// export default RatedItem
