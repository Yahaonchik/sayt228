import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Clock, Droplets, RotateCw } from "lucide-react";

interface ControlPanelProps {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function ControlPanel({ isRunning, onStart, onStop }: ControlPanelProps) {
  const [program, setProgram] = useState("cotton");
  const [temperature, setTemperature] = useState([40]);
  const [spinSpeed, setSpinSpeed] = useState([1200]);
  const [waterLevel, setWaterLevel] = useState([5]);

  const programs = {
    cotton: "Хлопок",
    synthetic: "Синтетика", 
    delicate: "Деликатные",
    wool: "Шерсть",
    quick: "Быстрая стирка",
    eco: "Эко-режим"
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <RotateCw className="w-4 h-4 text-white" />
          </div>
          <span>Панель управления</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Program Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Программа стирки</label>
          <Select value={program} onValueChange={setProgram} disabled={isRunning}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(programs).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Temperature Control */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Thermometer className="w-4 h-4" />
              <span>Температура</span>
            </label>
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              {temperature[0]}°C
            </Badge>
          </div>
          <Slider
            value={temperature}
            onValueChange={setTemperature}
            max={90}
            min={20}
            step={10}
            className="w-full"
            disabled={isRunning}
          />
        </div>

        {/* Spin Speed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <RotateCw className="w-4 h-4" />
              <span>Скорость отжима</span>
            </label>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {spinSpeed[0]} об/мин
            </Badge>
          </div>
          <Slider
            value={spinSpeed}
            onValueChange={setSpinSpeed}
            max={1400}
            min={400}
            step={200}
            className="w-full"
            disabled={isRunning}
          />
        </div>

        {/* Water Level */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <Droplets className="w-4 h-4" />
              <span>Уровень воды</span>
            </label>
            <Badge variant="outline" className="bg-cyan-50 text-cyan-700">
              {waterLevel[0]}/10
            </Badge>
          </div>
          <Slider
            value={waterLevel}
            onValueChange={setWaterLevel}
            max={10}
            min={1}
            step={1}
            className="w-full"
            disabled={isRunning}
          />
        </div>

        {/* Program Info */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Время цикла:</span>
            <span className="text-sm text-gray-600">
              {program === "quick" ? "30 мин" : 
               program === "eco" ? "3 ч 15 мин" :
               program === "delicate" ? "1 ч 45 мин" : "2 ч 30 мин"}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {program === "cotton" && "Идеально для повседневного белья из хлопка"}
            {program === "synthetic" && "Оптимально для синтетических тканей"}
            {program === "delicate" && "Бережная стирка для деликатных тканей"}
            {program === "wool" && "Специальная программа для шерстяных изделий"}
            {program === "quick" && "Быстрая стирка для слабозагрязненного белья"}
            {program === "eco" && "Экономичная программа с низким энергопотреблением"}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex space-x-3 pt-2">
          {!isRunning ? (
            <Button
              onClick={onStart}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              Запустить стирку
            </Button>
          ) : (
            <Button
              onClick={onStop}
              variant="destructive"
              className="flex-1"
            >
              Остановить
            </Button>
          )}
        </div>

        {/* Status Indicator */}
        {isRunning && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-800">
                Стирка в процессе
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              Программа: {programs[program as keyof typeof programs]} • Температура: {temperature[0]}°C
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
