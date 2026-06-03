"use client";

import { useState, useMemo, useEffect } from "react";
import { Control, useFieldArray, Controller, useWatch } from "react-hook-form";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import { ActivityFormValues } from "@/features/activity-form/types";
import Button from "@/components/Button/Button";
import FormController from "@/components/Form/FormController";

interface ScheduleSectionProps {
  control: Control<ActivityFormValues>;
  onDuplicateChange?: (hasDuplicate: boolean) => void;
}

type ScheduleItem = NonNullable<ActivityFormValues["schedules"]>[number];

const ScheduleSection = ({
  control,
  onDuplicateChange,
}: ScheduleSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedules",
  });

  const schedulesValue = useWatch({
    control,
    name: "schedules",
    defaultValue: [],
  }) as ScheduleItem[];

  const hasDuplicate = useMemo(() => {
    for (let i = 0; i < schedulesValue.length; i++) {
      for (let j = i + 1; j < schedulesValue.length; j++) {
        const s1 = schedulesValue[i];
        const s2 = schedulesValue[j];

        if (
          s1.date &&
          s2.date &&
          s1.date === s2.date &&
          s1.startTime &&
          s1.endTime &&
          s2.startTime &&
          s2.endTime &&
          s1.endTime > s2.startTime &&
          s1.startTime < s2.endTime
        ) {
          return true;
        }
      }
    }
    return false;
  }, [schedulesValue]);

  // 부모에 중복 여부 전달하여 submit 제어
  useEffect(() => {
    onDuplicateChange?.(hasDuplicate);
  }, [hasDuplicate]);

  const [currentDate, setCurrentDate] = useState("");
  const [currentStartTime, setCurrentStartTime] = useState("");
  const [currentEndTime, setCurrentEndTime] = useState("");
  const [scheduleError, setScheduleError] = useState("");

  const handleAddSchedule = () => {
    if (!currentDate || !currentStartTime || !currentEndTime) {
      setScheduleError("날짜와 시간 모두 입력해주세요.");
      return;
    }

    const isDuplicated = schedulesValue.some((schedule) => {
      if (!schedule.date || !schedule.startTime || !schedule.endTime) {
        return false;
      }

      if (schedule.date !== currentDate) {
        return false;
      }

      return (
        currentStartTime < schedule.endTime &&
        currentEndTime > schedule.startTime
      );
    });

    if (isDuplicated) {
      setScheduleError("이미 등록한 시간대와 겹칩니다.");
      return;
    }

    setScheduleError("");

    append({
      date: currentDate,
      startTime: currentStartTime,
      endTime: currentEndTime,
    });

    setCurrentDate("");
    setCurrentStartTime("");
    setCurrentEndTime("");
  };

  return (
    <FormController
      control={control}
      name="schedules"
      rules={{
        validate: (value) =>
          value?.length > 0 || "최소 하나의 스케줄을 등록해야 합니다.",
      }}
      render={() => (
        <div className="w-full">
          <p className="text-16-medium mb-2.5 block">예약 가능한 시간대</p>

          <div className="flex flex-col gap-5">
            <div className="w-full flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3.5">
              <div className="w-full">
                <label className="text-16-medium mb-2.5 block">날짜</label>
                <DatePicker value={currentDate} onChange={setCurrentDate} />
              </div>

              <div className="w-full flex items-center gap-3.5">
                <div className="w-full flex-1">
                  <TimePicker
                    value={currentStartTime}
                    onChange={(val) => setCurrentStartTime(String(val))}
                    label={<span className="hidden md:block">시작 시간</span>}
                  />
                </div>

                <div className="w-2 h-0.5 mt-3 md:mt-8 bg-gray-800"></div>

                <div className="w-full flex-1">
                  <TimePicker
                    value={currentEndTime}
                    onChange={(val) => setCurrentEndTime(String(val))}
                    label={<span className="hidden md:block">종료 시간</span>}
                    minTime={currentStartTime}
                  />
                </div>

                <div className="mt-2.5 md:mt-8">
                  <Button
                    variant="mainBlue"
                    type="button"
                    onClick={handleAddSchedule}
                    icon={<PlusIcon width={24} height={24} />}
                    iconJustify="center"
                    className="w-10.5 h-10.5 rounded-full hover:brightness-90 transition"
                  />
                </div>
              </div>
            </div>

            {scheduleError && (
              <p className="text-red-500 text-14-medium">{scheduleError}</p>
            )}

            {fields.length > 0 && (
              <div className="w-full h-px bg-gray-100"></div>
            )}

            {/* 추가된 예약 시간대 */}
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="w-full flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3.5"
                >
                  <Controller
                    control={control}
                    name={`schedules.${index}.date`}
                    rules={{ required: true }}
                    render={({ field: dateField }) => (
                      <DatePicker
                        value={dateField.value}
                        onChange={dateField.onChange}
                      />
                    )}
                  />
                  <div className="w-full flex items-center gap-3.5">
                    <div className="w-full flex-1">
                      <Controller
                        control={control}
                        name={`schedules.${index}.startTime`}
                        rules={{ required: true }}
                        render={({ field: startField }) => (
                          <TimePicker
                            value={startField.value}
                            onChange={startField.onChange}
                          />
                        )}
                      />
                    </div>

                    <div className="w-2 h-0.5 bg-gray-800"></div>

                    <div className="w-full flex-1">
                      <Controller
                        control={control}
                        name={`schedules.${index}.endTime`}
                        rules={{ required: true }}
                        render={({ field: endField }) => (
                          <TimePicker
                            value={endField.value}
                            onChange={endField.onChange}
                            minTime={schedulesValue[index]?.startTime}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Button
                        variant="onlyGray"
                        type="button"
                        onClick={() => remove(index)}
                        icon={<MinusIcon width={24} height={24} />}
                        iconJustify="center"
                        className="w-10.5 h-10.5 rounded-full hover:bg-gray-100 transition"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {hasDuplicate && (
                <p className="text-red-500 text-14-medium">
                  시간대가 겹치는 체험이 있습니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default ScheduleSection;
