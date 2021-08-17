import { useEffect, useState } from "react";
import { Button, Form, Select, Input, Row, Col } from 'antd';
import axios from "axios";
import api from "../api";
import { PlusOutlined, PlusSquareOutlined, SaveOutlined } from "@ant-design/icons";

const { Option } = Select

function AddressForm (props) {
    const [form] = Form.useForm()    
    const [cities, setCities] = useState()
    const [districts, setDistricts] = useState()    
    const [sections, setSections] = useState()    
    const [buildings, setBuildings] = useState()    

    useEffect(() => {        
        getCities()            
    }, [])

    function getCities () {
        axios({
            method: 'GET',
            url: `${api.cities}/`,            
        }).then(res => {
            setCities(res.data.results)            
        }).catch(err => {
            console.log(err.message)
        })
    }

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

    function onSelectCity(id) {                           
        getDisctricts(id)
        form.setFieldsValue({
            district: undefined,
            section: undefined,
            address: undefined
        })
    }

    function onSelectDistrict(id) {                                   
        form.setFieldsValue({            
            section: undefined,
            address: undefined
        })
    }

    function onFinish (values) {                
        console.log(values)
        props.changeAddress(values, getAddress(values))
    }

    function getAddress (address) {
        let city = cities.find(x => x.id.toString() === address.city).name
        let district = districts.find(x => x.id.toString() === address.district).name
        let result =  city + ", " + district + ", дүүрэг"        
        if (address.section) {
            result = result + ", " + address.section + "-р хороо"
        }
        if (address.address) {
            result = result + ", " + address.address
        }        
        return result
    }

    return (
        <div>            
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={onFinish}
            >
                <Form.Item name="city" label="Хот">
                    <Select                                
                        placeholder="Хот сонгох"
                        optionFilterProp="children"
                        onSelect={onSelectCity}
                    >
                        { cities ? cities.map(city => (
                            <Option key={city.id}>{city.name}</Option>
                        )) : <></> }
                    </Select>          
                </Form.Item>
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
                    <Input.Group>
                        <Row gutter={8}>
                            <Col span={18}>
                                <Select                                
                                    placeholder="Хороо сонгох"
                                    optionFilterProp="children"            
                                    onSelect={onSelectDistrict}    
                                    style={{ width: '100%' }}             
                                >
                                    { sections ? sections.map(section => (
                                        <Option key={section.id}>{section.name}</Option>
                                    )) : <></> }
                                </Select>  
                            </Col>
                            <Col span={6}>
                                <Button icon={<PlusOutlined />} type="primary" style={{ width: '100%' }}>Нэмэх</Button>
                            </Col>
                        </Row>
                    </Input.Group>                    
                </Form.Item>              
                <Form.Item name="building" label="Байр">
                    <Input.Group>
                        <Row gutter={8}>
                            <Col span={18}>
                                <Select                                
                                    placeholder="Байр сонгох"
                                    optionFilterProp="children"            
                                    onSelect={onSelectDistrict}    
                                    style={{ width: '100%' }}             
                                >
                                    { buildings ? buildings.map(building => (
                                        <Option key={building.id}>{building.name}</Option>
                                    )) : <></> }
                                </Select>  
                            </Col>
                            <Col span={6}>
                                <Button icon={<PlusOutlined />} type="primary" style={{ width: '100%' }}>Нэмэх</Button>
                            </Col>
                        </Row>
                    </Input.Group>                    
                </Form.Item>                            
                <Form.Item name="additional" label="Нэмэлт (Орц, Давхар, Тоот)">
                    <Input.TextArea rows={6} />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={18}></Col>
                    <Col span={6}>                
                        <Button icon={<SaveOutlined />} type="primary" style={{ width: '100%' }} onClick={form.submit}>Хадгалах</Button>                                                               
                    </Col>
                </Row>      
            </Form>
        </div>
    )
}

export default AddressForm;