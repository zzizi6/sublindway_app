import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// CSS import
import '../css/traininfo_user.css';
import '../css/traininfo_user_v2.css';
import '../css/LocationScreen.css';

function SubwayStatus(props) {
    const [subwayNm, setSubwayNm] = useState('');
    const [statnId, setStatnId] = useState('');
    const [updnLine, setUpdnLine] = useState('');
    const [trainSttus, setTrainSttus] = useState('');
    const [statnNm, setStatnNm] = useState('');
    const [str, setStr] = useState('');
    
    const user = JSON.parse(sessionStorage.getItem('user'));

    const { trainNumber } = props;

    useEffect(() => {
        const fetchTrainData = async () => {
            try {
                const backendUrl = `http://15.164.219.39:8079/track-train?trainNumber=${trainNumber}`;
                const response = await axios.get(backendUrl);
                console.log('Data received:', response.data);

                if (response.data) {
                    const slicedStatnId = response.data.statnId.slice(-4);
                    setStatnId(slicedStatnId);
                    setSubwayNm(response.data.subwayNm);
                    setUpdnLine(response.data.updnLine);
                    setTrainSttus(response.data.trainSttus);
                    setStatnNm(response.data.statnNm);

                    let tempStr = '';

                    if (['1', '2', '3', '4'].includes(slicedStatnId.charAt(1))) {
                        tempStr = 'T' + slicedStatnId;
                        tempStr += trainSttus === '1' ? '_Y' : '_N';

                        // 2호선일때
                        if (slicedStatnId.charAt(1) === '2') {
                            tempStr += updnLine === '0' ? '_1' : '_2';
                        } else { // 2호선 아닐때
                            tempStr += updnLine === '0' ? '_1' : '_2';
                            console.log(`4호선 : ${updnLine}`);
                        }

                    } else {
                        tempStr = 'T2' + slicedStatnId.slice(-3);
                        tempStr += trainSttus === '1' ? '_1' : '_0';
                        tempStr += updnLine === '0' ? '_1' : '_0';
                    }

                    tempStr += '_v2 tip';
                    setStr(tempStr);

                } else {
                    console.error("해당 열차가 현재 운행하지 않거나, 열차에 대한 정보가 없습니다.");
                }

            } catch (error) {
                console.error("해당 열차가 현재 운행하지 않거나, 열차에 대한 정보가 없습니다.");
                // console.error('Error fetching data:', error);
            }
        };
        fetchTrainData();

        const interval = setInterval(fetchTrainData, 30000); // 30초마다 데이터 새로고침
        return () => clearInterval(interval);

    }, [trainSttus, updnLine, trainNumber]);

    return (
        <div>
            {subwayNm === "1호선" && <div id="subwayMap" className="subway1" title="1호선 노선도">
                <div className="1line" title="1호선 노선도">
                    <div className="t_way1 t_way1_0152_v2" title="종각"></div>
                    <div className="t_way1 t_way1_0154_v2" title="종로5가"></div>
                    <div className="t_way1 t_way1_0157_v2" title="제기동"></div>
                    <div className="t_way1 t_way1_0158_v2" title="청량리"></div>
                    <div className="t_way1 t_way1_1002_v2" title="남영"></div>
                    <div className="t_way1 t_way1_1003_v2" title="용산"></div>
                    <div className="t_way1 t_way1_1004_v2" title="노량진"></div>
                    <div className="t_way1 t_way1_1005_v2" title="대방"></div>
                    <div className="t_way1 t_way1_1006_v2" title="영등포"></div>
                    <div className="t_way1 t_way1_1015_v2" title="회기"></div>
                    <div className="t_way1 t_way1_1016_v2" title="외대앞"></div>
                    <div className="t_way1 t_way1_1017_v2" title="신이문"></div>
                    <div className="t_way1 t_way1_1019_v2" title="광운대"></div>
                    <div className="t_way1 t_way1_1020_v2" title="월계"></div>
                    <div className="t_way1 t_way1_1021_v2" title="녹천"></div>
                    <div className="t_way1 t_way1_1401_v2" title="봉명"></div>
                    <div className="t_way1 t_way1_1402_v2" title="쌍용(나사렛대)"></div>
                    <div className="t_way1 t_way1_1403_v2" title="아산"></div>
                    <div className="t_way1 t_way1_1404_v2" title="탕정"></div>
                    <div className="t_way1 t_way1_1405_v2" title="배방"></div>
                    <div className="t_way1 t_way1_1407_v2" title="온양온천"></div>
                    <div className="t_way1 t_way1_1408_v2" title="신창"></div>
                    <div className="t_way1 t_way1_1701_v2" title="구로"></div>
                    <div className="t_way1 t_way1_1703_v2" title="금천구청"></div>
                    <div className="t_way1 t_way1_1704_v2" title="석수"></div>
                    <div className="t_way1 t_way1_1705_v2" title="관악"></div>
                    <div className="t_way1 t_way1_1706_v2" title="안양"></div>
                    <div className="t_way1 t_way1_1707_v2" title="명학"></div>
                    <div className="t_way1 t_way1_1709_v2" title="군포"></div>
                    <div className="t_way1 t_way1_1710_v2" title="의왕"></div>
                    <div className="t_way1 t_way1_1711_v2" title="성균관대"></div>
                    <div className="t_way1 t_way1_1712_v2" title="화서"></div>
                    <div className="t_way1 t_way1_1713_v2" title="수원"></div>
                    <div className="t_way1 t_way1_1714_v2" title="독산"></div>
                    <div className="t_way1 t_way1_1715_v2" title="세류"></div>
                    <div className="t_way1 t_way1_1716_v2" title="병점"></div>
                    <div className="t_way1 t_way1_1717_v2" title="세마"></div>
                    <div className="t_way1 t_way1_1718_v2" title="오산대"></div>
                    <div className="t_way1 t_way1_1719_v2" title="오산"></div>
                    <div className="t_way1 t_way1_1720_v2" title="진위"></div>
                    <div className="t_way1 t_way1_1721_v2" title="송탄"></div>
                    <div className="t_way1 t_way1_1722_v2" title="서정리"></div>
                    <div className="t_way1 t_way1_1723_v2" title="지제"></div>
                    <div className="t_way1 t_way1_1724_v2" title="평택"></div>
                    <div className="t_way1 t_way1_1725_v2" title="성환"></div>
                    <div className="t_way1 t_way1_1726_v2" title="직산"></div>
                    <div className="t_way1 t_way1_1727_v2" title="두정"></div>
                    <div className="t_way1 t_way1_1728_v2" title="천안"></div>
                    <div className="t_way1 t_way1_1729_v2" title="당정"></div>
                    <div className="t_way1 t_way1_1749_v2" title="서동탄"></div>
                    <div className="t_way1 t_way1_1750_v2" title="광명"></div>
                    <div className="t_way1 t_way1_1801_v2" title="개봉"></div>
                    <div className="t_way1 t_way1_1802_v2" title="오류동"></div>
                    <div className="t_way1 t_way1_1803_v2" title="역곡"></div>
                    <div className="t_way1 t_way1_1804_v2" title="부천"></div>
                    <div className="t_way1 t_way1_1805_v2" title="송내"></div>
                    <div className="t_way1 t_way1_1806_v2" title="부평"></div>
                    <div className="t_way1 t_way1_1807_v2" title="백운"></div>
                    <div className="t_way1 t_way1_1808_v2" title="동암"></div>
                    <div className="t_way1 t_way1_1809_v2" title="주안"></div>
                    <div className="t_way1 t_way1_1810_v2" title="제물포"></div>
                    <div className="t_way1 t_way1_1811_v2" title="동인천"></div>
                    <div className="t_way1 t_way1_1812_v2" title="인천"></div>
                    <div className="t_way1 t_way1_1813_v2" title="구일(동양미래대학)"></div>
                    <div className="t_way1 t_way1_1814_v2" title="소사"></div>
                    <div className="t_way1 t_way1_1815_v2" title="부개"></div>
                    <div className="t_way1 t_way1_1816_v2" title="간석"></div>
                    <div className="t_way1 t_way1_1817_v2" title="도원"></div>
                    <div className="t_way1 t_way1_1822_v2" title="중동"></div>
                    <div className="t_way1 t_way1_1823_v2" title="도화"></div>
                    <div className="t_way1 t_way1_1901_v2" title="방학"></div>
                    <div className="t_way1 t_way1_1902_v2" title="도봉"></div>
                    <div className="t_way1 t_way1_1904_v2" title="망월사"></div>
                    <div className="t_way1 t_way1_1905_v2" title="회룡"></div>
                    <div className="t_way1 t_way1_1906_v2" title="의정부"></div>
                    <div className="t_way1 t_way1_1907_v2" title="가능"></div>
                    <div className="t_way1 t_way1_1908_v2" title="녹양"></div>
                    <div className="t_way1 t_way1_1909_v2" title="양주"></div>
                    <div className="t_way1 t_way1_1910_v2" title="덕계"></div>
                    <div className="t_way1 t_way1_1911_v2" title="덕정"></div>
                    <div className="t_way1 t_way1_1912_v2" title="지행"></div>
                    <div className="t_way1 t_way1_1913_v2" title="동두천중앙"></div>
                    <div className="t_way1 t_way1_1914_v2" title="보산"></div>
                    <div className="t_way1 t_way1_1915_v2" title="동두천"></div>
                    <div className="t_way1 t_way1_1916_v2" title="소요산"></div>
                    <div className="t_way1 t_way1_1917_v2" title="청산"></div>
                    <div className="t_way1 t_way1_1918_v2" title="전곡"></div>
                    <div className="t_way1 t_way1_1919_v2" title="연천"></div>
                </div>

                {/* 열차추가-1 */}
                <div className="1line_metro">
                    <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                </div>
            </div>
            }

            {
                subwayNm === "2호선" && <div id="subwayMap" className="subway2" title="2호선 노선도">
                    <div className="2line" title="2호선 노선도">
                        <div className="t_way2 t_way2_0202_v2" title="을지로입구"></div>
                        <div className="t_way2 t_way2_0207_v2" title="상왕십리"></div>
                        <div className="t_way2 t_way2_0209_v2" title="한양대"></div>
                        <div className="t_way2 t_way2_0210_v2" title="뚝섬"></div>
                        <div className="t_way2 t_way2_0211_v2" title="성수"></div>
                        <div className="t_way2 t_way2_0213_v2" title="구의"></div>
                        <div className="t_way2 t_way2_0214_v2" title="강변"></div>
                        <div className="t_way2 t_way2_0215_v2" title="잠실나루"></div>
                        <div className="t_way2 t_way2_0217_v2" title="잠실새내"></div>
                        <div className="t_way2 t_way2_0218_v2" title="종합운동장"></div>
                        <div className="t_way2 t_way2_0219_v2" title="삼성"></div>
                        <div className="t_way2 t_way2_0220_v2" title="선릉"></div>
                        <div className="t_way2 t_way2_0221_v2" title="역삼"></div>
                        <div className="t_way2 t_way2_0222_v2" title="강남"></div>
                        <div className="t_way2 t_way2_0224_v2" title="서초"></div>
                        <div className="t_way2 t_way2_0225_v2" title="방배"></div>
                        <div className="t_way2 t_way2_0227_v2" title="낙성대"></div>
                        <div className="t_way2 t_way2_0228_v2" title="서울대입구"></div>
                        <div className="t_way2 t_way2_0229_v2" title="봉천"></div>
                        <div className="t_way2 t_way2_0230_v2" title="신림"></div>
                        <div className="t_way2 t_way2_0231_v2" title="신대방"></div>
                        <div className="t_way2 t_way2_0232_v2" title="구로디지털단지"></div>
                        <div className="t_way2 t_way2_0235_v2" title="문래"></div>
                        <div className="t_way2 t_way2_0237_v2" title="당산"></div>
                        <div className="t_way2 t_way2_0239_v2" title="홍대입구"></div>
                        <div className="t_way2 t_way2_0240_v2" title="신촌(지하)"></div>
                        <div className="t_way2 t_way2_0241_v2" title="이대"></div>
                        <div className="t_way2 t_way2_0242_v2" title="아현"></div>
                        <div className="t_way2 t_way2_0244_v2" title="용답"></div>
                        <div className="t_way2 t_way2_0245_v2" title="신답"></div>
                        <div className="t_way2 t_way2_0247_v2" title="도림천"></div>
                        <div className="t_way2 t_way2_0248_v2" title="양천구청"></div>
                        <div className="t_way2 t_way2_0249_v2" title="신정네거리"></div>
                        <div className="t_way2 t_way2_0250_v2" title="용두"></div>
                        <div className="t_way2 t_way2_0246_v2" title="신설동"></div>
                        <div className="t_way2 t_way2_0201_v2" title="시청"></div>
                        <div className="t_way2 t_way2_0234_v2" title="신도림"></div>
                    </div>

                    {/* 열차추가-2 */}
                    <div className="2line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }

            {
                subwayNm === "3호선" && <div id="subwayMap" className="subway3" title="3호선 노선도">
                    <div className="3line" title="3호선 노선도">
                        <div className="t_way3 t_way3_0309_v2" title="지축"></div>
                        <div className="t_way3 t_way3_0310_v2" title="구파발"></div>
                        <div className="t_way3 t_way3_0313_v2" title="녹번"></div>
                        <div className="t_way3 t_way3_0314_v2" title="홍제"></div>
                        <div className="t_way3 t_way3_0315_v2" title="무악재"></div>
                        <div className="t_way3 t_way3_0316_v2" title="독립문"></div>
                        <div className="t_way3 t_way3_0317_v2" title="경복궁"></div>
                        <div className="t_way3 t_way3_0318_v2" title="안국"></div>
                        <div className="t_way3 t_way3_0322_v2" title="동대입구"></div>
                        <div className="t_way3 t_way3_0324_v2" title="금호"></div>
                        <div className="t_way3 t_way3_0325_v2" title="옥수"></div>
                        <div className="t_way3 t_way3_0326_v2" title="압구정"></div>
                        <div className="t_way3 t_way3_0327_v2" title="신사"></div>
                        <div className="t_way3 t_way3_0328_v2" title="잠원"></div>
                        <div className="t_way3 t_way3_0331_v2" title="남부터미널"></div>
                        <div className="t_way3 t_way3_0332_v2" title="양재"></div>
                        <div className="t_way3 t_way3_0333_v2" title="매봉"></div>
                        <div className="t_way3 t_way3_0334_v2" title="도곡"></div>
                        <div className="t_way3 t_way3_0335_v2" title="대치"></div>
                        <div className="t_way3 t_way3_0336_v2" title="학여울"></div>
                        <div className="t_way3 t_way3_0337_v2" title="대청"></div>
                        <div className="t_way3 t_way3_0338_v2" title="일원"></div>
                        <div className="t_way3 t_way3_0339_v2" title="수서"></div>
                        <div className="t_way3 t_way3_0341_v2" title="경찰병원"></div>
                        <div className="t_way3 t_way3_1948_v2" title="원흥"></div>
                        <div className="t_way3 t_way3_1950_v2" title="삼송"></div>
                        <div className="t_way3 t_way3_1951_v2" title="원당"></div>
                        <div className="t_way3 t_way3_1952_v2" title="화정"></div>
                        <div className="t_way3 t_way3_1953_v2" title="대곡"></div>
                        <div className="t_way3 t_way3_1954_v2" title="백석"></div>
                        <div className="t_way3 t_way3_1955_v2" title="마두"></div>
                        <div className="t_way3 t_way3_1956_v2" title="정발산"></div>
                        <div className="t_way3 t_way3_1957_v2" title="주엽"></div>
                        <div className="t_way3 t_way3_1958_v2" title="대화"></div>
                        <div className="t_way3 t_way3_0320_v2" title="을지로3가"></div>
                        <div className="t_way3 t_way3_0330_v2" title="교대"></div>
                    </div>

                    {/* 열차추가-3 */}
                    <div className="3line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }

            {
                subwayNm === "4호선" && <div id="subwayMap" className="subway4" title="4호선 노선도">
                    <div className="4line" title="4호선 노선도">
                        {/* <SubwayStatus statnId1='420' trainSttus1='1' updnLine1='1'></SubwayStatus> */}

                        <div className="t_way4 t_way4_0405_v2" title="진접"></div>
                        <div className="t_way4 t_way4_0406_v2" title="오남"></div>
                        <div className="t_way4 t_way4_0408_v2" title="별내별가람"></div>
                        <div className="t_way4 t_way4_0409_v2" title="당고개"></div>
                        <div className="t_way4 t_way4_0410_v2" title="상계"></div>
                        <div className="t_way4 t_way4_0413_v2" title="쌍문"></div>
                        <div className="t_way4 t_way4_0414_v2" title="수유"></div>
                        <div className="t_way4 t_way4_0415_v2" title="미아"></div>
                        <div className="t_way4 t_way4_0416_v2" title="미아사거리"></div>
                        <div className="t_way4 t_way4_0417_v2" title="길음"></div>
                        <div className="t_way4 t_way4_0418_v2" title="성신여대입구"></div>
                        <div className="t_way4 t_way4_0419_v2" title="한성대입구"></div>
                        <div className="t_way4 t_way4_0420_v2" title="혜화"></div>
                        <div className="t_way4 t_way4_0424_v2" title="명동"></div>
                        <div className="t_way4 t_way4_0425_v2" title="회현"></div>
                        <div className="t_way4 t_way4_0427_v2" title="숙대입구(갈월)"></div>
                        <div className="t_way4 t_way4_0429_v2" title="신용산"></div>
                        <div className="t_way4 t_way4_0430_v2" title="이촌"></div>
                        <div className="t_way4 t_way4_0431_v2" title="동작"></div>
                        <div className="t_way4 t_way4_0434_v2" title="남태령"></div>
                        <div className="t_way4 t_way4_1450_v2" title="선바위"></div>
                        <div className="t_way4 t_way4_1451_v2" title="경마공원"></div>
                        <div className="t_way4 t_way4_1452_v2" title="대공원"></div>
                        <div className="t_way4 t_way4_1453_v2" title="과천"></div>
                        <div className="t_way4 t_way4_1454_v2" title="정부과천청사"></div>
                        <div className="t_way4 t_way4_1455_v2" title="인덕원"></div>
                        <div className="t_way4 t_way4_1456_v2" title="평촌"></div>
                        <div className="t_way4 t_way4_1457_v2" title="범계"></div>
                        <div className="t_way4 t_way4_1751_v2" title="산본"></div>
                        <div className="t_way4 t_way4_1752_v2" title="대야미"></div>
                        <div className="t_way4 t_way4_1753_v2" title="반월"></div>
                        <div className="t_way4 t_way4_1754_v2" title="상록수"></div>
                        <div className="t_way4 t_way4_1755_v2" title="한대앞"></div>
                        <div className="t_way4 t_way4_1756_v2" title="중앙"></div>
                        <div className="t_way4 t_way4_1757_v2" title="고잔"></div>
                        <div className="t_way4 t_way4_1758_v2" title="초지"></div>
                        <div className="t_way4 t_way4_1759_v2" title="안산"></div>
                        <div className="t_way4 t_way4_1760_v2" title="신길온천"></div>
                        <div className="t_way4 t_way4_1761_v2" title="정왕"></div>
                        <div className="t_way4 t_way4_1762_v2" title="오이도"></div>
                        <div className="t_way4 t_way4_1763_v2" title="수리산"></div>
                        <div className="t_way4 t_way4_0412_v2" title="창동"></div>
                        <div className="t_way4 t_way4_0421_v2" title="동대문"></div>
                        <div className="t_way4 t_way4_0426_v2" title="서울역"></div>
                        <div className="t_way4 t_way4_1458_v2" title="금정"></div>
                        <div className="t_way4 t_way4_0433_v2" title="사당"></div>
                        <div className="t_way4 t_way4_0422_v2" title="동대문역사문화공원"></div>
                        <div className="t_way4 t_way4_0423_v2" title="충무로"></div>
                    </div>

                    {/* 열차추가-4 */}

                    <div className="4line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                        {/* <img alt={`${user.trainNum}+열차+${statnNm}`} style={{ width: '38px', height: '29px', margin: '5.5px 1px' }} /> */}
                    </div>
                </div>
            }

            {
                subwayNm === "5호선" && <div id="subwayMap" className="subway5" title="5호선 노선도">
                    <div className="5line" title="5호선 노선도">
                        <div className="t_way5 t_way5_2511_v2" title="방화"></div>
                        <div className="t_way5 t_way5_2512_v2" title="개화산"></div>
                        <div className="t_way5 t_way5_2513_v2" title="김포공항"></div>
                        <div className="t_way5 t_way5_2514_v2" title="송정"></div>
                        <div className="t_way5 t_way5_2515_v2" title="마곡"></div>
                        <div className="t_way5 t_way5_2516_v2" title="발산"></div>
                        <div className="t_way5 t_way5_2517_v2" title="우장산"></div>
                        <div className="t_way5 t_way5_2518_v2" title="화곡"></div>
                        <div className="t_way5 t_way5_2520_v2" title="신정"></div>
                        <div className="t_way5 t_way5_2521_v2" title="목동"></div>
                        <div className="t_way5 t_way5_2522_v2" title="오목교"></div>
                        <div className="t_way5 t_way5_2523_v2" title="양평"></div>
                        <div className="t_way5 t_way5_2525_v2" title="영등포시장"></div>
                        <div className="t_way5 t_way5_2527_v2" title="여의도"></div>
                        <div className="t_way5 t_way5_2528_v2" title="여의나루"></div>
                        <div className="t_way5 t_way5_2529_v2" title="마포"></div>
                        <div className="t_way5 t_way5_2531_v2" title="애오개"></div>
                        <div className="t_way5 t_way5_2533_v2" title="서대문"></div>
                        <div className="t_way5 t_way5_2534_v2" title="광화문"></div>
                        <div className="t_way5 t_way5_2539_v2" title="신금호"></div>
                        <div className="t_way5 t_way5_2540_v2" title="행당"></div>
                        <div className="t_way5 t_way5_2542_v2" title="마장"></div>
                        <div className="t_way5 t_way5_2543_v2" title="답십리"></div>
                        <div className="t_way5 t_way5_2544_v2" title="장한평"></div>
                        <div className="t_way5 t_way5_2546_v2" title="아차산"></div>
                        <div className="t_way5 t_way5_2547_v2" title="광나루"></div>
                        <div className="t_way5 t_way5_2549_v2" title="강동"></div>
                        <div className="t_way5 t_way5_2550_v2" title="길동"></div>
                        <div className="t_way5 t_way5_2551_v2" title="굽은다리"></div>
                        <div className="t_way5 t_way5_2552_v2" title="명일"></div>
                        <div className="t_way5 t_way5_2553_v2" title="고덕"></div>
                        <div className="t_way5 t_way5_2554_v2" title="상일동"></div>
                        <div className="t_way5 t_way5_2562_v2" title="강일"></div>
                        <div className="t_way5 t_way5_2563_v2" title="미사"></div>
                        <div className="t_way5 t_way5_2564_v2" title="하남풍산"></div>
                        <div className="t_way5 t_way5_2565_v2" title="하남시청"></div>
                        <div className="t_way5 t_way5_2566_v2" title="하남검단산"></div>
                        <div className="t_way5 t_way5_2555_v2" title="둔촌동"></div>
                        <div className="t_way5 t_way5_2556_v2" title="올림픽공원"></div>
                        <div className="t_way5 t_way5_2557_v2" title="방이"></div>
                        <div className="t_way5 t_way5_2559_v2" title="개롱"></div>
                        <div className="t_way5 t_way5_2560_v2" title="거여"></div>
                        <div className="t_way5 t_way5_2561_v2" title="마천"></div>
                        <div className="t_way5 t_way5_2526_v2" title="신길"></div>
                        <div className="t_way5 t_way5_2519_v2" title="까치산"></div>
                        <div className="t_way5 t_way5_2524_v2" title="영등포구청"></div>
                        <div className="t_way5 t_way5_2532_v2" title="충정로"></div>
                        <div className="t_way5 t_way5_2536_v2" title="을지로4가"></div>
                        <div className="t_way5 t_way5_2541_v2" title="왕십리"></div>
                        <div className="t_way5 t_way5_2535_v2" title="종로3가"></div>
                        <div className="t_way5 t_way5_2558_v2" title="오금"></div>
                        <div className="t_way5 t_way5_2537_v2" title="동대문역사문화공원"></div>
                    </div>

                    {/* 열차추가-5 */}
                    <div className="5line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }

            {
                subwayNm === "6호선" && <div id="subwayMap" className="subway6" title="6호선 노선도">
                    <div className="6line" title="6호선 노선도">
                        <div className="t_way6 t_way6_2611_v2" title="응암"></div>
                        <div className="t_way6 t_way6_2612_v2" title="역촌"></div>
                        <div className="t_way6 t_way6_2614_v2" title="독바위"></div>
                        <div className="t_way6 t_way6_2616_v2" title="구산"></div>
                        <div className="t_way6 t_way6_2617_v2" title="새절"></div>
                        <div className="t_way6 t_way6_2618_v2" title="증산"></div>
                        <div className="t_way6 t_way6_2619_v2" title="디지털미디어시티"></div>
                        <div className="t_way6 t_way6_2620_v2" title="월드컵경기장"></div>
                        <div className="t_way6 t_way6_2621_v2" title="마포구청"></div>
                        <div className="t_way6 t_way6_2622_v2" title="망원"></div>
                        <div className="t_way6 t_way6_2624_v2" title="상수"></div>
                        <div className="t_way6 t_way6_2625_v2" title="광흥창"></div>
                        <div className="t_way6 t_way6_2626_v2" title="대흥"></div>
                        <div className="t_way6 t_way6_2628_v2" title="효창공원앞"></div>
                        <div className="t_way6 t_way6_2630_v2" title="녹사평"></div>
                        <div className="t_way6 t_way6_2631_v2" title="이태원"></div>
                        <div className="t_way6 t_way6_2632_v2" title="한강진"></div>
                        <div className="t_way6 t_way6_2633_v2" title="버티고개"></div>
                        <div className="t_way6 t_way6_2638_v2" title="창신"></div>
                        <div className="t_way6 t_way6_2639_v2" title="보문"></div>
                        <div className="t_way6 t_way6_2640_v2" title="안암"></div>
                        <div className="t_way6 t_way6_2641_v2" title="고려대"></div>
                        <div className="t_way6 t_way6_2642_v2" title="월곡"></div>
                        <div className="t_way6 t_way6_2643_v2" title="상월곡"></div>
                        <div className="t_way6 t_way6_2644_v2" title="돌곶이"></div>
                        <div className="t_way6 t_way6_2647_v2" title="화랑대"></div>
                        <div className="t_way6 t_way6_2648_v2" title="봉화산"></div>
                        <div className="t_way6 t_way6_2649_v2" title="신내"></div>
                        <div className="t_way6 t_way6_2637_v2" title="동묘앞"></div>
                        <div className="t_way6 t_way6_2645_v2" title="석계"></div>
                        <div className="t_way6 t_way6_2623_v2" title="합정"></div>
                        <div className="t_way6 t_way6_2636_v2" title="신당"></div>
                        <div className="t_way6 t_way6_2613_v2" title="불광"></div>
                        <div className="t_way6 t_way6_2615_v2" title="연신내"></div>
                        <div className="t_way6 t_way6_2634_v2" title="약수"></div>
                        <div className="t_way6 t_way6_2629_v2" title="삼각지"></div>
                        <div className="t_way6 t_way6_2627_v2" title="공덕"></div>
                        <div className="t_way6 t_way6_2635_v2" title="청구"></div>
                    </div>

                    {/* 열차추가-6 */}
                    <div className="6line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }
            {
                subwayNm === "7호선" && <div id="subwayMap" className="subway7" title="7호선 노선도">
                    <div className="7line" title="7호선 노선도" id="ui-id-20">
                        <div className="t_way7 t_way7_2711_v2" title="장암"></div>
                        <div className="t_way7 t_way7_2713_v2" title="수락산"></div>
                        <div className="t_way7 t_way7_2714_v2" title="마들"></div>
                        <div className="t_way7 t_way7_2716_v2" title="중계"></div>
                        <div className="t_way7 t_way7_2717_v2" title="하계"></div>
                        <div className="t_way7 t_way7_2718_v2" title="공릉"></div>
                        <div className="t_way7 t_way7_2720_v2" title="먹골"></div>
                        <div className="t_way7 t_way7_2721_v2" title="중화"></div>
                        <div className="t_way7 t_way7_2722_v2" title="상봉"></div>
                        <div className="t_way7 t_way7_2723_v2" title="면목"></div>
                        <div className="t_way7 t_way7_2724_v2" title="사가정"></div>
                        <div className="t_way7 t_way7_2725_v2" title="용마산"></div>
                        <div className="t_way7 t_way7_2726_v2" title="중곡"></div>
                        <div className="t_way7 t_way7_2728_v2" title="어린이대공원"></div>
                        <div className="t_way7 t_way7_2730_v2" title="뚝섬유원지"></div>
                        <div className="t_way7 t_way7_2731_v2" title="청담"></div>
                        <div className="t_way7 t_way7_2732_v2" title="강남구청"></div>
                        <div className="t_way7 t_way7_2733_v2" title="학동"></div>
                        <div className="t_way7 t_way7_2734_v2" title="논현"></div>
                        <div className="t_way7 t_way7_2735_v2" title="반포"></div>
                        <div className="t_way7 t_way7_2737_v2" title="내방"></div>
                        <div className="t_way7 t_way7_2739_v2" title="남성"></div>
                        <div className="t_way7 t_way7_2740_v2" title="숭실대입구"></div>
                        <div className="t_way7 t_way7_2741_v2" title="상도"></div>
                        <div className="t_way7 t_way7_2742_v2" title="장승배기"></div>
                        <div className="t_way7 t_way7_2743_v2" title="신대방삼거리"></div>
                        <div className="t_way7 t_way7_2744_v2" title="보라매"></div>
                        <div className="t_way7 t_way7_2745_v2" title="신풍"></div>
                        <div className="t_way7 t_way7_2747_v2" title="남구로"></div>
                        <div className="t_way7 t_way7_2749_v2" title="철산"></div>
                        <div className="t_way7 t_way7_2750_v2" title="광명사거리"></div>
                        <div className="t_way7 t_way7_2751_v2" title="천왕"></div>
                        <div className="t_way7 t_way7_2753_v2" title="까치울"></div>
                        <div className="t_way7 t_way7_2754_v2" title="부천종합운동장"></div>
                        <div className="t_way7 t_way7_2755_v2" title="춘의"></div>
                        <div className="t_way7 t_way7_2756_v2" title="신중동"></div>
                        <div className="t_way7 t_way7_2757_v2" title="부천시청"></div>
                        <div className="t_way7 t_way7_2758_v2" title="상동"></div>
                        <div className="t_way7 t_way7_2759_v2" title="삼산체육관"></div>
                        <div className="t_way7 t_way7_2760_v2" title="굴포천"></div>
                        <div className="t_way7 t_way7_2761_v2" title="부평구청"></div>
                        <div className="t_way7 t_way7_3762_v2" title="산곡"></div>
                        <div className="t_way7 t_way7_3763_v2" title="석남(거북시장)"></div>
                        <div className="t_way7 t_way7_2712_v2" title="도봉산"></div>
                        <div className="t_way7 t_way7_2748_v2" title="가산디지털단지"></div>
                        <div className="t_way7 t_way7_2752_v2" title="온수"></div>
                        <div className="t_way7 t_way7_2729_v2" title="건대입구"></div>
                        <div className="t_way7 t_way7_2746_v2" title="대림"></div>
                        <div className="t_way7 t_way7_2736_v2" title="고속터미널"></div>
                        <div className="t_way7 t_way7_2715_v2" title="노원"></div>
                        <div className="t_way7 t_way7_2738_v2" title="총신대입구(이수)"></div>
                        <div className="t_way7 t_way7_2727_v2" title="군자"></div>
                        <div className="t_way7 t_way7_2719_v2" title="태릉입구"></div>
                    </div>

                    {/* 열차추가-7 */}
                    <div className="7line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }

            {
                subwayNm === "8호선" && <div id="subwayMap" className="subway8" title="8호선 노선도">
                    <div className="8line" title="8호선 노선도" id="ui-id-22">
                        <div className="t_way8 t_way8_2811_v2" title="암사"></div>
                        <div className="t_way8 t_way8_2813_v2" title="강동구청"></div>
                        <div className="t_way8 t_way8_2814_v2" title="몽촌토성"></div>
                        <div className="t_way8 t_way8_2816_v2" title="석촌"></div>
                        <div className="t_way8 t_way8_2817_v2" title="송파"></div>
                        <div className="t_way8 t_way8_2819_v2" title="문정"></div>
                        <div className="t_way8 t_way8_2820_v2" title="장지"></div>
                        <div className="t_way8 t_way8_2821_v2" title="복정"></div>
                        <div className="t_way8 t_way8_2822_v2" title="산성"></div>
                        <div className="t_way8 t_way8_2823_v2" title="남한산성입구"></div>
                        <div className="t_way8 t_way8_2824_v2" title="단대오거리"></div>
                        <div className="t_way8 t_way8_2825_v2" title="신흥"></div>
                        <div className="t_way8 t_way8_2826_v2" title="수진"></div>
                        <div className="t_way8 t_way8_2827_v2" title="모란"></div>
                        <div className="t_way8 t_way8_2828_v2" title="남위례"></div>
                        <div className="t_way8 t_way8_2815_v2" title="잠실"></div>
                        <div className="t_way8 t_way8_2818_v2" title="가락시장"></div>
                        <div className="t_way8 t_way8_2812_v2" title="천호"></div>
                    </div>

                    {/* 열차추가-8 */}
                    <div className="8line_metro">
                        <div className={str} title={`${trainNumber}열차 ${statnNm}`} data-statntcd="0234" tabIndex="68" />
                    </div>
                </div>
            }
        </div>
    );
}

// 열차 노선 지도 전반적 제어
const TrainMap = () => {
    const trainMapRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();
    const [isStopped, setIsStopped] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [trainNumber, setTrainNumber] = useState(user.trainNum);

    useEffect(() => {
        if (trainNumber === '') setIsStopped(true);
    }, [user, trainNumber])

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const mapStyles = window.getComputedStyle(trainMapRef.current);
        const left = parseInt(mapStyles.left, 10);
        const top = parseInt(mapStyles.top, 10);
        setStartPos({
            x: e.clientX - left,
            y: e.clientY - top
        });
        e.preventDefault(); // 브라우저 기본 드래그 동작 및 선택 방지
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const x = e.clientX - startPos.x;
            const y = e.clientY - startPos.y;
            trainMapRef.current.style.left = `${x}px`;
            trainMapRef.current.style.top = `${y}px`;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const trainMap = trainMapRef.current;
        trainMap.addEventListener('mousedown', handleMouseDown);
        // 이벤트 리스너를 등록합니다.
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            // Cleanup function에서 이벤트 리스너를 제거합니다.
            trainMap.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

    }, [isDragging, startPos]); // 의존성 배열에 isDragging과 startPos 추가

    return (
        <div>
            <div>
                {/* 메뉴 */}
                <div className="menu-container">
                    <div className="menu-screen">
                        <h1 className="menu-title" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>GreenBoogie</h1>
                        <h2 className="menu-id" style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>{user.userName} 님</h2>
                        <button className="menu-button" onClick={() => navigate('/locationMap')} style={{ fontFamily: 'IBM Plex Sans KR, sans-serif' }}>나가기</button>
                    </div>
                </div>

                <div id="traininfo-contents">
                    <div ref={trainMapRef} id="trainMap" style={{ position: 'relative', overflow: 'hidden', left: 0, top: 0 }}>
                        {/* 노선표시화면 (유저가 하차하면 !isStopped가 false가 되어 실행 x) */}
                        {!isStopped && (<SubwayStatus trainNumber={trainNumber}></SubwayStatus>)}
                    </div>
                    {/* 유저 승차x or 하차했을때 화면 (드래그 적용 x) */}
                    {isStopped && (<div style={{ display: 'flex', justifycontent: 'center', alignitems: 'center', height: '100vh' }}>
                        <div style={{ fontFamily: 'IBM Plex Sans KR, sans-serif', color: 'green', textAlign: 'center' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용자가 탑승을 하지 않았거나 이미 하차한 상태입니다.</div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default TrainMap;