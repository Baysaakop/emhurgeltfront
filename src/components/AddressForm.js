import { useEffect, useState } from "react";
import { Button, Form, Select, Input, Row, Col } from 'antd';
import axios from "axios";
import api from "../api";
import { CheckOutlined, DoubleLeftOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select

function AddressForm (props) {
    const [form] = Form.useForm()    
    // const [cities, setCities] = useState()
    const [districts, setDistricts] = useState()    
    const [sections, setSections] = useState()    
    const [buildings, setBuildings] = useState()        
    const [buildingNew, setBuildingNew] = useState(false)

    useEffect(() => {        
        getDisctricts("1")            
    }, [])

    // function getCities () {
    //     axios({
    //         method: 'GET',
    //         url: `${api.cities}/`,            
    //     }).then(res => {
    //         setCities(res.data.results)            
    //     }).catch(err => {
    //         console.log(err.message)
    //     })
    // }

    function getDisctricts (target) {
        let url = `${api.districts}?city=${parseInt(target)}`
        axios({
            method: 'GET',
            url: url,    
        }).then(res => {
            setDistricts(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }

    function getSections (target) {
        let url = `${api.sections}?district=${parseInt(target)}`
        axios({
            method: 'GET',
            url: url,    
        }).then(res => {
            setSections(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }

    function getBuildings (target) {
        let url = `${api.buildings}?section=${parseInt(target)}`
        axios({
            method: 'GET',
            url: url,    
        }).then(res => {
            setBuildings(res.data.results)
        }).catch(err => {
            console.log(err.message)
        })
    }

    // function onSelectCity(id) {                           
    //     getDisctricts(id)
    //     form.setFieldsValue({
    //         district: undefined,
    //         section: undefined,
    //         building: undefined,
    //         additional: undefined
    //     })
    // }

    function onSelectDistrict(id) {       
        getSections(id)                            
        form.setFieldsValue({            
            section: undefined,
            building: undefined,
            additional: undefined
        })
    }

    function onSelectSection(id) {       
        getBuildings(id)                            
        form.setFieldsValue({                        
            building: undefined,
            additional: undefined
        })
    }

    function onSelectBuilding(id) {                                      
        form.setFieldsValue({                                    
            additional: undefined
        })
    }

    function onFinish (values) {                                
        let district = districts.find(x => x.id.toString() === values.district).name
        let section = "";
        let building = "";
        if (buildingNew) {
            section = sections.find(x => x.id.toString() === values.section).name
            building = values.buildingNew
            axios({
                method: 'POST',
                url: `${api.buildings}/`,
                data: {                    
                    section: values.section,
                    name: values.buildingNew
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${props.token}`            
                }
            })      
        } else {
            section = sections.find(x => x.id.toString() === values.section).name
            building = buildings.find(x => x.id.toString() === values.building).name
        }        
        let address = "Улаанбаатар, " + district + " дүүрэг, " + section + " хороо, " + building + " байр, " + values.additional          
        props.changeAddress(address)        
    }    

    return (
        <div>            
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
            >
                {/* <Form.Item name="city" label="Хот">
                    <Select                     
                        defaultValue="1"                    
                        placeholder="Хот сонгох"
                        optionFilterProp="children"
                        onSelect={onSelectCity}
                    >
                        { cities ? cities.map(city => (
                            <Option key={city.id}>{city.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item> */}
                <Form.Item name="district" label="Дүүрэг">
                    <Select                                
                        placeholder="Дүүрэг сонгох"
                        optionFilterProp="children"            
                        onSelect={onSelectDistrict}                 
                    >
                        { districts ? districts.map(district => (
                            <Option key={district.id}>{district.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item>          
                <Form.Item name="section" label="Хороо">
                    <Select                                
                        placeholder="Хороо сонгох"
                        optionFilterProp="children"            
                        onSelect={onSelectSection}                 
                    >
                        { sections ? sections.map(section => (
                            <Option key={section.id}>{section.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item>                                                                                            
                { buildingNew ? (                            
                    <Row gutter={8}>
                        <Col span={16}>
                            <Form.Item name="buildingNew" label="Байр">         
                                <Input placeholder="Байрны дугаараа оруулна уу." />   
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Button icon={<DoubleLeftOutlined />} type="dashed" style={{ width: '100%', marginTop: '30px'  }} onClick={() => setBuildingNew(false)}>Сонгох</Button>
                        </Col>
                    </Row>                    
                ) : (                                
                    <Row gutter={[8, 8]}>
                        <Col span={16}>
                            <Form.Item name="building" label="Байр">     
                                <Select                                
                                    placeholder="Байр сонгох"
                                    optionFilterProp="children"            
                                    onSelect={onSelectBuilding}    
                                    style={{ width: '100%' }}             
                                >
                                    { buildings ? buildings.map(building => (
                                        <Option key={building.id}>{building.name}</Option>
                                    )) : <></> }
                                </Select>  
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Button icon={<PlusOutlined />} type="dashed" style={{ width: '100%', marginTop: '30px' }} onClick={() => setBuildingNew(true)}>Нэмэх</Button>
                        </Col>
                    </Row>                                         
                )}                        
                <Form.Item name="additional" label="Нэмэлт мэдээлэл (Орц, Давхар, Тоот)">
                    <Input.TextArea rows={6} placeholder="1 орц, 2 давхар, 33 тоот" />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={16}></Col>
                    <Col span={8}>                
                        <Button icon={<CheckOutlined />} type="primary" style={{ width: '100%' }} onClick={form.submit}>Хадгалах</Button>                                                               
                    </Col>
                </Row>      
            </Form>
        </div>
    )
}

export default AddressForm;