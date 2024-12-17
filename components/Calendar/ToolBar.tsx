import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  modelSchema,
  ModelType,
  planningSchema,
  ViewType,
} from "@/components/Calendar/shema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getTechnicien } from "@/service/auth";
import { UserType } from "@/schema";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useCookies } from "react-cookie";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  createModel,
  createPlanning,
  getModels,
} from "@/components/Calendar/service";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { DateTimePicker } from "@/components/date-picker";
interface ToolBarProps {
  setView: (view: ViewType) => void;
  view: "day" | "week" | "month";
  toolbarInfo: (view: ViewType) => string;
  goNext: () => void;
  goBack: () => void;
  goToday: () => void;
  technicienId: string;
  setTechnicienId: (id: string) => void;
    refetchPlanning: () => void;
}

const ToolBar = (props: ToolBarProps) => {
  const {
    setView,
    view,
    toolbarInfo,
    goNext,
    goBack,
    goToday,
    technicienId,
    setTechnicienId,
    refetchPlanning,
  } = props;
  const { toast } = useToast();
  const [cookies] = useCookies(["token"]);

  const [modelForm, setModelForm] = useState(false);
  const handleViewChange = (view: ViewType) => {
    setView(view);
  };
  const { data: technicienData = [] } = useQuery({
    queryFn: () => getTechnicien(cookies.token),
    queryKey: ["technicien"],
  });
  const { data: modelData = [], refetch: refetchModel } = useQuery({
    queryFn: () => getModels(),
    queryKey: ["model"],
  });
  const mutationModel = useMutation({
    mutationFn: createModel,
    mutationKey: ["model"],
    onSuccess: () => {
      setModelForm(false);
      toast({
        title: "Modéle créé",
      });
      refetchModel();
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erreur lors de la création du modéle",
        description: error.name,
      });
    },
  });
  const mutationPlanning = useMutation({
    mutationFn: createPlanning,
    mutationKey: ["planing"],
    onSuccess: () => {
      toast({
        title: "Planning créé",
      });
    },
  });
  const formModel = useForm({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      nom: "",
      duree: "00:00",
    },
  });
  const formPlanning = useForm({
    resolver: zodResolver(planningSchema),
    defaultValues: {
      id_model: "",
      id_technicien: technicienId,
      dateTime: new Date(),
    },
  });
  const onSubmitModel = (data: z.infer<typeof modelSchema>) => {
    mutationModel.mutate(data);
  };
  const onSubmitPlanning = (data: z.infer<typeof planningSchema>) => {
    mutationPlanning.mutate(data);
  };
  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          <Button variant="ghost" onClick={goBack}>
            <ChevronLeft />
          </Button>
          <Button variant="secondary" onClick={goToday}>
            Aujourd&apos;hui
          </Button>
          <Button variant="ghost" onClick={goNext}>
            <ChevronRight />
          </Button>
        </div>
        <div className="text-xl">{toolbarInfo(view)}</div>
      </div>
      <div className="flex gap-2  items-center w-3/5">
        <Select
          defaultValue={technicienId}
          onValueChange={(value) => {
            setTechnicienId(value);
            refetchPlanning();
          }}
        >
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <Avatar className="size-7">
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${
                    technicienData.find(
                      (technicien: UserType) => technicien.id === technicienId,
                    )?.nom
                  }${
                    technicienData.find(
                      (technicien: UserType) => technicien.id === technicienId,
                    )?.prenom
                  }`}
                />
              </Avatar>
              {technicienData.find(
                (technicien: UserType) => technicien.id === technicienId,
              )?.nom || "Sélectionnez un technicien"}{" "}
              {
                technicienData.find(
                  (technicien: UserType) => technicien.id === technicienId,
                )?.prenom
              }
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {technicienData.map((technicien: UserType) => (
                <SelectItem key={technicien.id} value={technicien.id ?? ""}>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien?.nom}${technicien?.prenom}`}
                      />
                    </Avatar>
                    {technicien.nom}.{technicien.prenom}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Popover
            open={modelForm}
            onOpenChange={() => setModelForm(!modelForm)}
          >
            <PopoverTrigger>
              <Button variant="secondary">Créer un modéle</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Form {...formModel}>
                {/*@ts-ignore*/}
                <form onSubmit={formModel.handleSubmit(onSubmitModel)}>
                  <div>
                    <FormField
                      control={formModel.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" placeholder="Nom" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formModel.control}
                      name="duree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Durée</FormLabel>
                          <FormControl>
                            <Input {...field} type="time" placeholder="Durée" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-2">
                      Créer
                    </Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button>Créer un evénement</Button>
            </PopoverTrigger>
            <PopoverContent>
              <Form {...formPlanning}>
                <form onSubmit={formPlanning.handleSubmit(onSubmitPlanning)}>
                  <FormField
                    control={formPlanning.control}
                    name="dateTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date et Heure</FormLabel>
                        <FormControl>
                          <DateTimePicker
                            value={field.value}
                            onChange={(date: Date) => field.onChange(date)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPlanning.control}
                    name="id_model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modéle</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              {modelData.find(
                                (model: ModelType) => model.id === field.value,
                              )?.nom || "Sélectionnez un modéle"}
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {modelData.map((model: ModelType) => (
                                  <SelectItem
                                    key={model.id}
                                    value={model.id ?? ""}
                                  >
                                    {model.nom}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formPlanning.control}
                    name="id_technicien"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technicien</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger>
                              Séléctionnez un technicien
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {technicienData.map((technicien: UserType) => (
                                  <SelectItem
                                    key={technicien.id}
                                    value={technicien.id ?? ""}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Avatar className="size-7">
                                        <AvatarImage
                                          src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${technicien?.nom}${technicien?.prenom}`}
                                        />
                                      </Avatar>
                                      {technicien.nom}.{technicien.prenom}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Enregistrer</Button>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex">
          <Button
            variant={view === "day" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("day")}
          >
            Jour
          </Button>
          <Button
            variant={view === "week" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("week")}
          >
            Semaine
          </Button>
          <Button
            variant={view === "month" ? "secondary" : "ghost"}
            onClick={() => handleViewChange("month")}
          >
            Mois
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
